
const express 		= require('express');
const app 			= express();
const bodyParser 	= require('body-parser');
const validator 	= require('express-validator');
const cookieParser 	= require('cookie-parser');
const csrf 			= require('csurf');

const session 		= require('express-session');
const ejs 			= require('express-ejs-extend');
const path 			= require('path');

const jwt = require('jsonwebtoken');
const $env 			= require('./config/env.json');

// Setup Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: '6YCQwZKX2csc8NxYRsTt7UbBeR59PNdM'
}));
app.use(validator());
app.use(csrf({ cookie: true }));
/*
|---------------------------------------------------------
| ENGINE
|---------------------------------------------------------
*/
app.engine('ejs', ejs);
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'app/View/'));

/*
|---------------------------------------------------------
| Public Directory
|---------------------------------------------------------
*/
app.use(express.static(path.join(__dirname, 'public')));

// Form token middleware
app.use(function (err, req, res, next){
	// CSRF error handler
	if(err.code !== 'EBADCSRFTOKEN') return next(err);

	// API token handler
	// router token exception
	// return token
	let arrayException = [
		'/api/auth/login', 
		'/api/user/register'
	];
	if(arrayException.includes(req.url)){
		next();
	}else{
		// check authorization bearer
		if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer'){
			let token = req.headers.authorization.split(' ')[1];
			try {
			  	let payload = jwt.verify(token, $env.jwt.key);
			  	next();
			} catch(err) {
				res.status(403);
				res.send('Invalid Token!');
			}
		}else{
			res.status(403);
			res.send('Invalid Token!');
		}
	}
})

app.use(function (req, res, next) {
	res.cookie('XSRF-TOKEN', req.csrfToken());
	res.locals.csrftoken = req.csrfToken();
	res.locals.user = typeof req.session.user != 'undefined' ? req.session.user : null;
	next();
});

/*
|---------------------------------------------------------
| Routes
|---------------------------------------------------------
*/
require('./routes/web.js')(app);
require('./routes/api.js')(app);

app.listen($env.PORT, () => console.log('Listening on port '+ $env.PORT +'!'));