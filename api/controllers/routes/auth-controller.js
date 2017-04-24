'use strict';

var router = require('express').Router();
var AuthenticationService = require('../../application-services/authentication-service');
var authenticationService = new AuthenticationService();

//TODO treat errors with some middleware

router.post('/register', function(req, res, next) {
	authenticationService.registerUser(req.body)
    .then((data) => {
      //TODO review the information that needs to be returned
        res.json(data);
      })
    .catch((err) => {
          console.log(err);
          next();
      });
});

router.post('/authenticate', function(req, res, next) {
    authenticationService.authenticate(req.body)
    .then((token) => {
        // return the information including token as JSON
        res.json({
          success: true,
          token: token
        });
        res.end()
    })
    .catch((err) => {
        //TODO middleware to handle errors
        //next(err);
        console.log(err)
        res.status(404).send({ error: 'Not found' })
    })
});

module.exports = router;
