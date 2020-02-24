const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const validator     = require('express-validator');
const cookieParser  = require('cookie-parser');
const csrf          = require('csurf');
const session       = require('express-session');
const ejs           = require('express-ejs-extend');
const path          = require('path');
const $env          = require('./config/env.json');
const appMiddleware = require('./app/Middlewares/appMiddleware');

// Setup Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: $env.SESSION_KEY
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
app.set('views', path.join(__dirname, 'app/Views/'));

/*
|---------------------------------------------------------
| Public Directory
|---------------------------------------------------------
*/
app.use(express.static(path.join(__dirname, 'public')));

// Form token middleware
app.use(appMiddleware.validateToken);

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