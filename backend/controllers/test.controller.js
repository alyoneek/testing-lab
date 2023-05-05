const Test = require('../models/test.model');
const Solution = require('../regularExpressionMatching');
const solution = new Solution();

const getTests = async (req, res) => {
  try {
    const tests = await Test.find();
    res.status(200).json(tests.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1)));
  } catch (error) {
    res.status(500).json(error);
  }
};

const createTest = async (req, res) => {
  try {
    const { string, pattern } = req.body;
    const result = solution.isMatch(string, pattern);
    const test = await Test.create({ string, pattern, result });
    res.status(201).json(test);
  } catch (error) {
    if (error.name === 'ValidationError') {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });

      return res.status(400).send({ validationErrors: errors });
    }
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getTests,
  createTest,
};
