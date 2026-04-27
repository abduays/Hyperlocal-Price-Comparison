const fs = require('fs');
const path = require('path');
const { matchProviders } = require('./matcher');

const providersPath = path.join(__dirname, 'data', 'providers.json');
const requestsLogPath = path.join(__dirname, 'data', 'requests-log.json');
const jobsLogPath = path.join(__dirname, 'data', 'jobs-log.json');

function readJson(filePath, fallback) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (_error) {
    return fallback;
  }
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function nextId(prefix, currentSize) {
  return `${prefix}${String(currentSize + 1).padStart(4, '0')}`;
}

function createWhatsAppLink(phone, message) {
  const cleanPhone = String(phone || '').replace(/[^\d+]/g, '');
  return `https://wa.me/${cleanPhone.replace('+', '')}?text=${encodeURIComponent(message)}`;
}

function processRequest(payload) {
  const providers = readJson(providersPath, []);
  const requestsLog = readJson(requestsLogPath, []);
  const jobsLog = readJson(jobsLogPath, []);

  const requestRecord = {
    requestId: nextId('R', requestsLog.length),
    createdAt: new Date().toISOString(),
    ...payload,
    status: 'received'
  };

  const matchResult = matchProviders(
    {
      serviceCategory: payload.serviceCategory,
      postcode: payload.postcode,
      budgetMin: payload.budgetMin,
      budgetMax: payload.budgetMax,
      urgency: payload.urgency
    },
    providers
  );

  const recommendation = matchResult.recommendation;
  const backup = matchResult.backup;

  const userMessage = recommendation
    ? `Best option: ${recommendation.providerName}, £${recommendation.priceMin}-£${recommendation.priceMax}, ${recommendation.availability}. Reply YES to confirm.`
    : 'No instant provider match found. We are expanding your search and will update you shortly.';

  const providerMessage = recommendation
    ? `New lead: ${payload.serviceCategory} in ${payload.postcode}, urgency ${payload.urgency}. Customer contact: ${payload.contactNumber}.`
    : 'No provider message created.';

  const jobRecord = {
    jobId: nextId('J', jobsLog.length),
    requestId: requestRecord.requestId,
    createdAt: new Date().toISOString(),
    recommendedProviderId: recommendation?.providerId || null,
    backupProviderId: backup?.providerId || null,
    quotedPriceRange: recommendation
      ? `£${recommendation.priceMin}-£${recommendation.priceMax}`
      : null,
    status: recommendation ? 'matched' : 'unmatched',
    userMessage,
    providerMessage
  };

  requestRecord.status = jobRecord.status;
  requestsLog.push(requestRecord);
  jobsLog.push(jobRecord);

  writeJson(requestsLogPath, requestsLog);
  writeJson(jobsLogPath, jobsLog);

  return {
    requestId: requestRecord.requestId,
    recommendation,
    backup,
    status: jobRecord.status,
    notifications: {
      userMessage,
      providerMessage,
      userWhatsAppLink: createWhatsAppLink(payload.contactNumber, userMessage),
      providerWhatsAppLink: recommendation
        ? createWhatsAppLink(recommendation.contactPhone, providerMessage)
        : null
    }
  };
}

module.exports = { processRequest };
