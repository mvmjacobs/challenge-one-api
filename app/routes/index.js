const api = require('../api');

module.exports = (app) => {

	app.route('/v1')
		.get(api.home);

	app.all('*', (req, res) => {
		res.redirect('/v1');
	});
};
