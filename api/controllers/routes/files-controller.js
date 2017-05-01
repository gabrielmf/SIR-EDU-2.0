'use strict';

let router = require('express').Router();
let fs = require('fs');
let mongoose = require('mongoose');
let Gridfs = require('gridfs-stream');
let multer = require('multer');
let upload = multer({ dest: 'files/' })
let gfs;
let checkPermissionsMiddleware = require('../../middlewares/check-permissions');

mongoose.connection.once('open', function() {
  gfs = new Gridfs(mongoose.connection.db, mongoose.mongo);
})

// router.use(checkPermissionsMiddleware);

router.post('/files', upload.any(), function(req, res, next){
    let file = req.files[0];
    
    let newFile = {
      _studentId: req.body.studentId,
      date: req.body.date,
      comment: req.body.comment
    };

    let writestream = gfs.createWriteStream({
      filename: file.filename,
      mode: 'w',
      content_type: file.mimetype,
      metadata: newFile
    });

    fs.createReadStream(file.path).pipe(writestream);

    writestream.on('finish', function() {
      fs.unlink(file.path, function(err) {
        if (err) {
          console.error(err);
        }
        console.log('unlink with success!')
      });
    });

    writestream.on('close', function(uploadedFile) {
      console.log('file', uploadedFile);
      res.json(uploadedFile);
    });

    writestream.on('error', function(err) {
      console.error(err);
      next(err);
    });
});

router.get('/files/:id', function(req, res, next){
  let readstream = gfs.createReadStream({
    _id: req.params.id
  });
  //res.set('content-type', 'image/jpeg');
  readstream.pipe(res);
});

//TODO reduce response size object
router.get('/files', function(req, res, next){
    gfs.files.find({ 'metadata._studentId': req.query.studentId }).toArray()
    .then((files) => {
      console.log('Get all files for student', files);
      res.json(files);
    }).catch((err) => {
      console.error(err);
      next(err);
    })
});

router.delete("/files/:id", function(req, res){
  console.log(req.params);
  let params = {_id: req.params.id };
  gfs.exist(params, function(err, found){
    if(err) return res.send("Error occured");
    if(found){
      gfs.remove(params, function(err){
        if(err) return res.send("Error occured");
        res.json({ type: 'success', msg: 'File deleted' });
      });
    } else{
      res.send("No image found with that title");
    }
  });
});

module.exports = router;