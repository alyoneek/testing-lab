const express = require('express');

const { getTests, createTest, deleteTest } = require('../controllers/test.controller');

const router = express.Router();

router.get('/tests', getTests);

router.post('/tests', createTest);

router.delete('/tests/:id', deleteTest);

module.exports = router;
