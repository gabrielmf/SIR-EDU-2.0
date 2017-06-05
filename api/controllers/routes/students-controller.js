'use strict';

const router = require('express').Router();
const Service = require('../../models/services/student-service');
const crypto = require('crypto');
const studentService = new Service();
const fs = require('fs');
const mime = require('mime');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let stat = null;
    let newDestination = 'uploads/';
    try {
        stat = fs.statSync(newDestination);
    } catch (err) {
        fs.mkdirSync(newDestination);
    }
    if (stat && !stat.isDirectory()) {
        throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
    }       
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

let upload = multer({ storage: storage });

//TODO 1 - middleware to check user permissions, 2- treat errors with some middleware
router.post('/students', upload.any(), function(req, res, next) {
    
    let newStudent = {
        _createdBy: req.user._id
    };

    Object.assign(newStudent, req.body);
    
    if(newStudent.specialNeeds) {
        newStudent.specialNeeds = newStudent.specialNeeds.split(',');
    }

    if(req.files && req.files.length > 0) {
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
        })
        .catch((err) => {
            console.log(err);
            next(err);
    });
});

router.get('/students', function(req, res, next) {
    studentService.find({ _createdBy: req.user._id })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            //TODO middleware to handle errors
            next(err);
        })
});

//TODO check if user has control over the student
router.get('/students/:id', function(req, res, next) {
    studentService.findById(req.params.id)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            next(err);
        })
});

router.delete('/students/:id', function(req, res, next) {
    studentService.delete(req.params.id)
    .then((studentRemoved) => {
        if(studentRemoved.image && studentRemoved.image.path) {
            fs.unlink(studentRemoved.image.path, (err) => {
                if (err) {
                    throw(err);
                }
            });
        }

        res.json(studentRemoved);
    })
    .catch((err) => {
        console.error(err);
        next(err);
    })
});

router.put('/students/:id', upload.any(), function(req, res, next) {
    let updateStudent = {};
    Object.assign(updateStudent, req.body);

    if(updateStudent.specialNeeds) {
        newStudent.specialNeeds = newStudent.specialNeeds.split(',');
    }

    if(req.files && req.files.length > 0) {
        req.files.forEach((file) => {
             updateStudent[file.fieldname] = {
                 path: file.path,
                 mimeType: file.mimetype
             }
        });
    }

    studentService.find({_studentId: req.params.id, _createdBy: req.user._id})
        .then((data) => {
        console.log('found', data);
    })
        .catch((err) => {
        next(err);
    })

    // //TODO remove old image from disk if user updates successefully
    // studentService.update(updateStudent)
    // .then((student) => {
    //     res.end();
    // })
    // .catch((err) => {
    //     next(err);
    // })
});

module.exports = router;