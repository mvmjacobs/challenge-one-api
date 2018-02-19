const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('../app/routes');
const path = require('path');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

module.exports = app;
