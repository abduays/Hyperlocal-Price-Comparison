const fs = require('fs');
const path = require('path');
const { matchProviders } = require('./matcher');

function readJson(filePath) {
  const absolutePath = path.resolve(process.cwd(), filePath);
  return JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
}

function run() {
  const [, , requestPath, providersPath] = process.argv;

  if (!requestPath || !providersPath) {
    console.error('Usage: npm run match -- <request.json> <providers.json>');
    process.exit(1);
  }

  const request = readJson(requestPath);
  const providers = readJson(providersPath);

  const result = matchProviders(request, providers);
  console.log(JSON.stringify(result, null, 2));
}

run();
