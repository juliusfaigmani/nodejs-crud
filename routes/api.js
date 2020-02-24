const Auth = require('../app/Controllers/Api/AuthController');
const User = require('../app/Controllers/Api/UserController');

module.exports = function(app) {
    /*
    * Authenticate User Login
    */
    app.post('/api/auth/login', Auth.login);

    /*
    * User Routes
    */
    app.post('/api/user/fetch', User.fetch);
    app.post('/api/user/register', User.register);
    app.put('/api/user/update', User.update);
    app.delete('/api/user/destroy', User.destroy);
}