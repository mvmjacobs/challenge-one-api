const api = require('../api');

module.exports = (app) => {

	app.route('/v1')
		.get(api.home);

	// usuários
	app.route('/v1/users')
		.post(api.insertUser)
		.get(api.listUsers);

	app.route('/v1/users/:identifier')
		.delete(api.removeUser)
		.get(api.getUser)
		.put(api.updateUser);

	// not found
	app.all('*', (req, res) => {
		res.redirect('/v1');
	});
};
