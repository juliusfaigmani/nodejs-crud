const jwt = require('jsonwebtoken');
const $env = require('../../../config/env.json');
const bcrypt = require('bcryptjs');
const {
	sequelize,
	Users
} = require('../../Models/Sequelize');

/*
* User Login
* author: julius.faigmani@gmail.com
*/
exports.login = function(req, res){
	req.check('email').isEmail().withMessage('The email must be a valid email address.');
	req.check('password').notEmpty().withMessage('password field is required.');

	const errors = req.validationErrors();

	// return validation errors
	if(errors) {
    	return res.status(422).json({ errors });
  	}
	let email = req.body.email;
	let password = req.body.password;
  	Users.findOne({
  		where:{
  			email: email
  		},
  		raw: true
  	}).then(function(data){
  		user = data;

  		// return error message if no record found.
  		if(!user){
			return res.status(422).json({ errors: [
				{
					param: 'alert',
					msg: 'ERROR: Invalid login credentials.'
				}
			] });
  		}
  		//Compare password if user has found.
  		let hashPassword = user.password;
		let compare = bcrypt.compareSync(password, hashPassword);
		if(!compare){
			return res.status(422).json({ errors: [
				{
					param: 'alert',
					msg: 'ERROR: Invalid login credentials.'
				}
			] });
		}else{
			// delete password in object user
			// for security purposes
			delete user.password;
			//Create Session
			req.session.user = user;

			// JWT 
			// for api usage
			let token = jwt.sign({
				id: user.id,
			  	email: user.email
			}, 
			$env.jwt.key, 
			{ 
				expiresIn: $env.jwt.exp 
			});

			res.cookie($env.jwt.token_name, token, { maxAge: parseInt($env.jwt.exp) * 1000 });

			res.status(201).json({
				success: true,
				user: user,
				token: token,
				redirect: '/'
			});
		}
  	});
}

