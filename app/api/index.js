const _ = require('lodash');
const path = require('path');

let db = require('../../config/database');
let api = {};

api.home = (req, res) => {
	res.sendFile(path.join(`${__dirname}/index.html`));
};

// usuários
api.listUsers = (req, res) => {

	const search = req.query;
	const limit = (search.limit) ? parseInt(search.limit) : 10;
	const skip = (search.page) ? parseInt(search.page) - 1 : 0;
	const sort = { name: 1 };

	delete search.page;
	delete search.limit;

	Object.keys(req.query).forEach(key => search[key] = new RegExp(req.query[key], 'i'));

	db.users.find(search).skip(skip * limit).limit(limit).sort(sort).exec(function (err, doc) {
		if (err)
			res.status(500).json({ success: false, message: err });

		res.json(doc);
	});
};

api.insertUser = (req, res) => {
	let user = req.body;

	if (!user)
		return;

	delete user._id;
	db.users.insert(user, function (err, newDoc) {
		if (err)
			res.status(500).json({ success: false, message: err });

		console.log(`${newDoc._id} success written`);
		res.json(newDoc._id);
	});
};

api.updateUser = (req, res) => {
	if (!req.params.identifier)
		return res.json({ success: false, message: `parameter identifier can not be null` });

	db.users.update({ _id: req.params.identifier }, req.body, function (err, numReplaced) {
		if (err)
			return res.json({ success: false, message: err });

		if (numReplaced)
			res.status(200).json({ success: true, message: `${req.params.identifier} success updated` });

		res.status(500).end({ success: false, message: `can not find user ${req.params.identifier}` });
	});
};

api.removeUser = (req, res) => {
	if (!req.params.identifier)
		return res.json({ success: false, message: `parameter identifier can not be null` });

	db.users.remove({ _id: req.params.identifier }, { multi: false }, function (err, numRemoved) {
		if (err)
			res.status(500).json({ success: false, message: err });

		if (numRemoved)
			return res.status(200).json({ success: true, message: `${req.params.identifier} success removed` });

		res.status(500).json({ success: false, message: `can not find user ${req.params.identifier}` });
	});
};

api.getUser = (req, res) => {
	if (!req.params.identifier)
		res.json({ success: false, message: `parameter identifier can not be null` });

	db.users.findOne({ _id: req.params.identifier }, function (err, doc) {
		if (err)
			res.json({ success: false, message: err });

		if (!doc)
			res.json({ success: false, message: `User can not be found. Maybe the identifier is wrong!` });

		res.json(doc);
	});
};


// projetos
api.listProjects = (req, res) => {
	const search = req.query;
	const limit = (search.limit) ? parseInt(search.limit) : 10;
	const skip = (search.page) ? parseInt(search.page) - 1 : 0;
	const sort = { name: 1 };

	delete search.page;
	delete search.limit;

	Object.keys(req.query).forEach(key => search[key] = new RegExp(req.query[key], 'i'));

	db.projects.find(search).skip(skip * limit).limit(limit).sort(sort).exec(function (err, doc) {
		if (err)
			res.status(500).json({ success: false, message: err });

		res.json(doc);
	});
};

api.insertProject = (req, res) => {
	let project = req.body;

	if (!project)
		return;

	delete project._id;
	db.projects.insert(project, function (err, newDoc) {
		if (err)
			res.status(500).json({ success: false, message: err });

		console.log(`${newDoc._id} success written`);
		res.json(newDoc._id);
	});
};

api.updateProject = (req, res) => {
	if (!req.params.identifier)
		return res.json({ success: false, message: `parameter identifier can not be null` });

	db.projects.update({ _id: req.params.identifier }, req.body, function (err, numReplaced) {
		if (err)
			return res.json({ success: false, message: err });

		if (numReplaced)
			res.status(200).json({ success: true, message: `${req.params.identifier} success updated` });

		res.status(500).end({ success: false, message: `can not find project ${req.params.identifier}` });
	});
};

api.removeProject = (req, res) => {
	if (!req.params.identifier)
		return res.json({ success: false, message: `parameter identifier can not be null` });

	db.projects.remove({ _id: req.params.identifier }, { multi: false }, function (err, numRemoved) {
		if (err)
			res.status(500).json({ success: false, message: err });

		if (numRemoved)
			return res.status(200).json({ success: true, message: `${req.params.identifier} success removed` });

		res.status(500).json({ success: false, message: `can not find project ${req.params.identifier}` });
	});
};

api.getProject = (req, res) => {
	if (!req.params.identifier)
		res.json({ success: false, message: `parameter identifier can not be null` });

	db.projects.findOne({ _id: req.params.identifier }, function (err, doc) {
		if (err)
			res.json({ success: false, message: err });

		if (!doc)
			res.json({ success: false, message: `Project can not be found. Maybe the identifier is wrong!` });

		res.json(doc);
	});
};

module.exports = api;
