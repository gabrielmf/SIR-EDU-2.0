'use strict';

let jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
let appConfig = require('../config/config');
let UserService = require('../models/services/user-service');

class AuthenticationService {
	constructor() {
		this.userService = new UserService();
	}

	_createToken(user) {
		return jwt.sign({email: user.email, role: user.role, _id: user._id}, appConfig.secret, {
          expiresIn: 1440 // expires in 24 hours
        });
	}

	//TODO _validatePassword is wrong, verify promises, order of functions calls
	authenticate(user) {
		return this.userService.findOne({ email : user.email })
			.then((userFound) => {
				return userFound.comparePassword(user.password)
				.then((isMatch) => {
					if(isMatch){
						return this._createToken(userFound);
					}
					else{
						//TODO Config file for error messages in portuguese
						throw new Error('O usuário não foi encontrado ou a senha informada esta incorreta.');
					}
				})
				.catch((err) => { throw err; });
			})
			.catch((err) => {
				throw err;
			});
	}

	registerUser(user) {
		return this.userService.save(user);
	}
}

module.exports = AuthenticationService;