const express = require('express');

const TestRoutes = require('./routes/test.route');

const app = express();

app.use(express.json());

app.use('/', TestRoutes);

module.exports = app;
