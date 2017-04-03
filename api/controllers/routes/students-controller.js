'use strict';

let router = require('express').Router();
let Service = require('../../models/services/student-service');
let studentService = new Service();
let fs = require('fs');
let multer = require('multer');
let upload = multer({ dest: 'uploads/' });
let checkPermissionsMiddleware = require('../../middlewares/check-permissions');

//router.use(checkPermissionsMiddleware);

//TODO 1 - middleware to check user permissions, 2- treat errors with some middleware
router.post('/students', upload.any(), function(req, res, next) {
    let newStudent = {};

    Object.assign(newStudent, req.body);
    if(req.body.specialNeeds) {
        newStudent.specialNeeds = JSON.parse(req.body.specialNeeds);
    }

    if(req.files.length > 0) {
        req.files.forEach((file) => {
             newStudent[file.fieldname] = {
                 path: file.path,
                 mimeType: file.mimetype
             }
        });
    }
    
    studentService.save(newStudent)
        .then((data) => {
            res.json(data);
            res.end();
        })
        .catch((err) => {
            console.log(err);
            next(err);
    });
});

router.get('/students', function(req, res, next) {
    studentService.find()
        .then((data) => {
            res.json(data);
            res.end();
        })
        .catch((err) => {
            //TODO middleware to handle errors
            next(err);
        })
});

router.get('/students/:id', function(req, res, next) {
    studentService.findById(req.params.id)
        .then((data) => {
            res.json(data);
            res.end();
        })
        .catch((err) => {
            //TODO middleware to handle errors
            next(err);
        })
});

router.delete('/students/:id', function(req, res, next) {
    studentService.delete(req.params.id)
    .then((studentRemoved) => {
        console.log('deleted', studentRemoved);
        fs.unlink(studentRemoved.image.path, (err) => {
            if (err) {
                throw(err);
            }
            console.log('unlink with success!')
            res.end()
        });
    })
    .catch((err) => {
        console.error(err);
        next(err);
    })
});

router.put('/students', upload.any(), function(req, res, next) {
    let updateStudent = {};
    Object.assign(updateStudent, req.body);

    if(req.files.length > 0) {
        let file = req.files[0];
        updateStudent['image.path'] = file.path;
        updateStudent['image.contentType'] = file.mimetype;
    }

    //TODO remove old image from disk if user updates successefully
    studentService.update(updateStudent)
    .then((student) => {
        res.end();
    })
    .catch((err) => {
        next(err);
    })
});

module.exports = router;