const _ = require('lodash');
const faker = require('faker/locale/pt_BR');
const path = require('path');

let db = require('../../config/database');
let api = {};

api.home = (req, res) => {
	res.sendFile(path.join(`${__dirname}/index.html`));
};

module.exports = api;
