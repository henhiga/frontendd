const express = require('express');
const fetch = global.fetch || require('node-fetch'); // node 18+ tem fetch global
const app = express();

const BACKEND_URL = process.env.BACKEND_URL || 'http://172.31.18.11:25000';
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/api/check', async (req, res) => {
  const name = req.query.name || '';
  if (!name) return res.status(400).json({ error: 'missing name' });
  try {
    const resp = await fetch(`${BACKEND_URL}/check?name=${encodeURIComponent(name)}`);
    const data = await resp.json();
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: 'backend unreachable', detail: String(err) });
  }
});

app.listen(PORT, () => console.log(`Web server on ${PORT}, backend=${BACKEND_URL}`));
