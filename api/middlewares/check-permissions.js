'use strict';

let jwt = require('jsonwebtoken');
let appConfig = require('../config/config');

function CheckPermissions(req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, appConfig.secret, (err, decoded) => {      
            if (err) {
                return res.status(403).send({ 
                    success: false, 
                    message: 'Invalid token.' 
                });
            } else {
                // if everything is good, save to request for use in other routes
                req.user = decoded;
                next();
            }
        });
    }
    else {
        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });
    }
}

module.exports = CheckPermissions;