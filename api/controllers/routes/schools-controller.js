'use strict';

let router = require('express').Router();
let schoolService = require('../../models/services/school-service');

router.post('/schools', function(req, res, next) {
    schoolService.saveSchool(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            next();
        });
});

router.get('/schools', function(req, res, next) {
    schoolService.getAll()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            //TODO middleware to handle errors
            next(err);
        })
});

router.get('/schools/:id', function(req, res, next) {
    schoolService.getSchool(req.params.id)
        .then((data) => {
            res.json({
                success: data
            });
        })
        .catch((err) => {
            //TODO middleware to handle errors
            next(err);
        })
});

module.exports = router;