const express = require('express');

const { getTests, createTest } = require('../controllers/test.controller');

const router = express.Router();

router.get('/tests', getTests);

router.post('/tests', createTest);

module.exports = router;
