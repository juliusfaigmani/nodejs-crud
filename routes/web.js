const Home = require('../app/Controllers/HomeController');

module.exports = function (app) {

	/*
	|-------------------------------------------
	| Home Page
	|-------------------------------------------
	*/
	app.get('/', Home.index);
	app.get('/logout', Home.logout);
}