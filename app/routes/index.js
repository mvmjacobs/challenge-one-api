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

	// projetos
	app.route('/v1/projects')
		.post(api.insertProject)
		.get(api.listProjects);

	app.route('/v1/projects/:identifier')
		.delete(api.removeProject)
		.get(api.getProject)
		.put(api.updateProject);

	// not found
	app.all('*', (req, res) => {
		res.redirect('/v1');
	});
};
