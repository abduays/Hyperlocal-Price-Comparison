const express = require('express');
const { matchProviders } = require('./matcher');

const app = express();
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'hyperlocal-matcher' });
});

app.post('/api/match', (req, res) => {
  const { request, providers } = req.body;

  if (!request || !Array.isArray(providers)) {
    return res.status(400).json({ error: 'Body must include request and providers array.' });
  }

  const result = matchProviders(request, providers);
  return res.json(result);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
