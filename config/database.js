const Datastore = require('nedb');
const projectsName = 'projects.db';
const usersName = 'users.db'
let db;
if (!db) {
	db = {
    users : new Datastore({
                  filename: usersName,
                  autoload: true
                }),
    projects : new Datastore({
                     filename : projectsName,
                     autoload : true
                  })
  } 
	console.log(`Banco ${db} pronto para uso`);
}

module.exports = db;
