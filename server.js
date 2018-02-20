const app = require('./config/express');
const db = require('./config/database');

const PORT = process.env.PORT || 3000

app.listen(PORT, function() {
	console.log('Servidor escutando na porta: ' + this.address().port);
});
