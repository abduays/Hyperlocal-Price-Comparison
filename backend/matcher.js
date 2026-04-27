function normalizeUrgency(urgency) {
  const value = (urgency || '').toLowerCase();
  if (value.includes('same day') || value.includes('immediate')) return 'immediate';
  if (value.includes('24')) return '24h';
  return 'flexible';
}

function availabilityScore(providerAvailability, requestUrgency) {
  const availability = (providerAvailability || '').toLowerCase();
  const urgency = normalizeUrgency(requestUrgency);

  if (urgency === 'immediate') {
    if (availability.includes('same day')) return 100;
    if (availability.includes('24')) return 75;
    return 40;
  }

  if (urgency === '24h') {
    if (availability.includes('same day') || availability.includes('24')) return 100;
    return 60;
  }

  return 90;
}

function budgetScore(providerMin, providerMax, budgetMin, budgetMax) {
  if (!budgetMin && !budgetMax) return 80;

  const min = Number(providerMin || 0);
  const max = Number(providerMax || providerMin || 999999);
  const bMin = Number(budgetMin || 0);
  const bMax = Number(budgetMax || budgetMin || 999999);

  if (max < bMin || min > bMax) return 20;
  if (min >= bMin && max <= bMax) return 100;
  return 70;
}

function priceScore(providerMin, providerMax) {
  const min = Number(providerMin || 0);
  const max = Number(providerMax || providerMin || 0);
  const midpoint = (min + max) / 2;

  if (midpoint <= 60) return 100;
  if (midpoint <= 100) return 85;
  if (midpoint <= 150) return 70;
  return 55;
}

function matchProviders(request, providers) {
  const service = (request.serviceCategory || '').toLowerCase();
  const postcode = (request.postcode || '').toUpperCase();

  const shortlisted = providers
    .filter((p) => (p.serviceCategory || '').toLowerCase() === service)
    .filter((p) => (p.locationCoverage || '').toUpperCase().includes(postcode.slice(0, 3)))
    .map((provider) => {
      const scoreAvailability = availabilityScore(provider.availability, request.urgency);
      const scoreBudget = budgetScore(
        provider.priceMin,
        provider.priceMax,
        request.budgetMin,
        request.budgetMax
      );
      const scorePrice = priceScore(provider.priceMin, provider.priceMax);
      const scoreRating = Number(provider.rating || 3) * 20;

      const weightedScore =
        scoreAvailability * 0.4 + scorePrice * 0.3 + scoreRating * 0.2 + scoreBudget * 0.1;

      return { ...provider, weightedScore: Number(weightedScore.toFixed(2)) };
    })
    .sort((a, b) => b.weightedScore - a.weightedScore);

  return {
    recommendation: shortlisted[0] || null,
    backup: shortlisted[1] || null,
    considered: shortlisted.length
  };
}

module.exports = { matchProviders };
