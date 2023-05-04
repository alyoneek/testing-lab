const express = require('express');
const app = express();
const Solution = require('./regularExpressionMatching');

app.use(express.json());

app.listen(5000, () => {
  console.log('success');
});

const tests = [];

app.get('/tests', (req, res) => {
  return res.status(200).json({
    data: tests,
    error: null,
  });
});

app.post('/tests', (req, res) => {
  try {
    const { string, pattern } = req.body;
    const solution = new Solution();
    const result = solution.isMatch(string, pattern);
    const newTest = {
      id: tests.length,
      string,
      pattern,
      result,
      time: new Date(),
    };
    tests.unshift(newTest);
    return res.status(201).json({
      data: newTest,
      error: null,
    });
  } catch (error) {
    return res.status(400).json({
      data: null,
      error: error.message,
    });
  }
});
