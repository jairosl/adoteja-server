import express from 'express';

const app = express();

app.get('/', (request, response) => response.json({ ok: false }));

app.listen(3333, () => {
  console.log('🚀 Server running on port 3333!');
});
