const bcrypt = require('bcryptjs');
const $env = require('../../../config/env.json');
const {
	sequelize,
	Users
} = require('../../Models/Sequelize');

/*
* Fetch Users
* author: julius.faigmani@gmail.com
*/
exports.fetch = function(req, res){
	// if(!res.locals.user){
	// 	res.status(200).json({records:null});
	// }else{
		Users.findAll({
			order: [
				['first_name','asc']
			],
			attributes: ['id','first_name','last_name','email']
		}).then(function(data){
			records = data;
			res.status(200).json({
				success: true,
				records: records
			});
		});
	//}
}

/*
* User Registration
* author: julius.faigmani@gmail.com
*/
exports.register = function(req, res){
	//Form validation
	req.check('first_name').notEmpty().withMessage('The first name field is required.');
	req.check('last_name').notEmpty().withMessage('The last name field is required.');
	req.check('email').isEmail().withMessage('The email must be a valid email address.');
	req.check('password').isLength({min:5}).withMessage('The password must be at least 5 characters.');
	
	const errors = req.validationErrors();

	// return validation errors
	if(errors) {
    	return res.status(422).json({ errors });
  	}

  	let email = req.body.email;
  	let password = req.body.password;
  	//created hashed password using bcrypt
  	var salt = bcrypt.genSaltSync($env.SALT_ROUNDS);
		password = bcrypt.hashSync(password, salt);
	
	let reqData = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		password: password
	};

	//Insert record
	Users.findOrCreate({
		defaults: reqData,
		where:{
			email: email
		}
	}).then(function(result){
		created = result[1];
		// Check if record has been created.
		// Return error message
		if(!created){
			let error = [{
				location: 'params',
				param: 'email',
				msg: 'Email already in use.'
			}];
			return res.status(422).json({ errors: error });
		}
		//If record created, return success message
		let json = {
			success: true,
			message: 'Registration completed successfully!'
		}
		if(res.locals.user){
			json.fetch = true;
		}
		res.status(201).json(json);
	});
}


/*
* Update User
* author: julius.faigmani@gmail.com
*/
exports.update = function(req, res){
	//Form validation
	req.check('first_name').notEmpty().withMessage('The first name field is required.');
	req.check('last_name').notEmpty().withMessage('The last name field is required.');
	req.check('email').isEmail().withMessage('The email must be a valid email address.');
	const errors = req.validationErrors();

	// return validation errors
	if(errors) {
    	return res.status(422).json({ errors });
  	}

  	let id = req.body.id;
  	let email = req.body.email;
  	let password = req.body.password;
  	//created hashed password using bcrypt
  	var salt = bcrypt.genSaltSync($env.SALT_ROUNDS);

	let reqData = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		email: req.body.email
	};

	if(req.body.password){
		password = bcrypt.hashSync(password, salt);
		reqData.password = password
	}

	//Update record
	Users.count({
		where: {
			email: email,
			id: {
				$not: id
			}
		}
	}).then(function(data){
		count = data;
		if(count){
			let error = [{
				location: 'params',
				param: 'email',
				msg: 'Email already in use.'
			}];
			return res.status(422).json({ errors: error });
		}
		Users.update(reqData,{
			where: {
				id: id
			}
		}).then(function(data){
			res.status(201).json({
				success: true,
				fetch: true,
				message: 'Registration completed successfully!'
			});
		});
	});
}

/*
* Delete User
* author: julius.faigmani@gmail.com
*/
exports.destroy = function(req, res){
	let id = req.body.id;
	Users.destroy({
		where: {
			id:id
		}
	}).then(function(data){
		res.status(201).json({
			success: true,
			fetch: true
		});
	});
}