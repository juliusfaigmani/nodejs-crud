const $env = require('../../config/env.json');
const jwt  = require('jsonwebtoken');
const {
    sequelize,
    Users
} = require('../Models/Sequelize');

function appMiddleware(){

    this.validateToken = async (err, req, res, next) => {

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
                let transaction;
                let token = req.headers.authorization.split(' ')[1];
                try {
                    let payload = jwt.verify(token, $env.jwt.key);
                    //Check User if exist
                    let result = await sequelize.transaction( async (t) => {
                        return await Users.findOne({
                            where: {
                                id: payload.id
                            },
                            raw: true,
                            attributes: ['id', 'email']
                        }, {transaction: t});
                    });
                    //Validate if the information is correct
                    if(result && result.id == payload.id && result.email == payload.email){
                        next();
                    }else{
                        res.status(500).send({
                            auth: false,
                            message: 'Failed to authenticate token.'
                        });
                    }
                } catch(err) {
                    res.status(500).send({
                        auth: false,
                        message: 'Failed to authenticate token.'
                    });
                }
            }else{
                res.status(401).send({
                    auth: false,
                    message: 'No token provided.'
                });
            }
        }
    }

}

module.exports = new appMiddleware();