'use strict';

const router = require('express').Router();
const JudgementService = require('../../models/services/judgement-service');
const judgementService = new JudgementService();

router.post('/judgement', function(req, res, next) {
    let newJudgement = {
        _createdBy: req.user._id,
        _studentId: req.body.studentId,
        text: req.body.text || '',
        date: req.body.date || '',
        type: 'judgement'
    };

    judgementService.save(newJudgement)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            next(err);
    });
});

router.get('/judgement', function(req, res, next) {
    judgementService.find({ _createdBy: req.user._id, _studentId: req.query.studentId })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            //TODO middleware to handle errors
            console.log(err);
            next(err);
        })
});

//TODO check if user has control over the student
router.get('/judgement/:id', function(req, res, next) {
    judgementService.findById(req.params.id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            next(err);
        })
});

router.delete('/judgement/:id', function(req, res, next) {
    res.end();
});

router.put('/judgement', function(req, res, next) {
    res.end();
});

module.exports = router;