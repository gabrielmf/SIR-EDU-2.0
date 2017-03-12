'use strict';

let router = require('express').Router();
let schoolService = require('../../models/services/school-service');
//TODO 1 - middleware to check user permissions, 2- treat errors with some middleware

router.post('/schools/add', function(req, res, next) {
    schoolService.saveSchool(req.body)
        .then((data) => {
            console.log('Salvando escola', data);
            res.json(data);
            next();
        })
        .catch((err) => {
            console.log(err);
            next();
        });
});

router.get('/schools/list', function(req, res, next) {
    schoolService.getAll()
        .then((data) => {
            // return the information
            console.log('Lista de escolas', data);
            res.json({
                success: data
            });
            next();
        })
        .catch((err) => {
            //TODO middleware to handle errors
            next(err);
        })
});

router.get('/schools/:id', function(req, res, next) {
    schoolService.getSchool(req.params.id)
        .then((data) => {
            // return the information
            console.log('Escola', data);
            res.json({
                success: data
            });
            next();
        })
        .catch((err) => {
            //TODO middleware to handle errors
            next(err);
        })
});

module.exports = router;