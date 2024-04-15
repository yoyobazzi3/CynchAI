const express = require('express');
const cors = require('cors'); 
const app = express();
const PORT = 3000;

app.use(cors()); 

app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/analyze', (req, res) => {
  const { text } = req.body;
  if (!text) {
      return res.status(400).json({ error: 'No text provided' });
  }

  const sentiments = ["positive", "neutral", "negative"];
  const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];

  res.json({
      text: text,
      sentiment: randomSentiment
  });
});
