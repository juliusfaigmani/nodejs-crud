/*
* Render Home page
* author: julius.faigmani@gmail.com
*/
exports.index = function(req, res){
    res.render('home');
}


/*
* Logout
* Kill Session User
* author: julius.faigmani@gmail.com
*/
exports.logout = function(req, res){
    req.session.destroy();
    res.redirect('/');
}