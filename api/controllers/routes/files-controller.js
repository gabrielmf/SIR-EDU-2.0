'use strict';

let router = require('express').Router();
let fs = require('fs');
let mongoose = require('mongoose');
let Gridfs = require('gridfs-stream');
let multer = require('multer');
let upload = multer({ dest: 'files/' })
let gfs;

mongoose.connection.once('open', function() {
  gfs = new Gridfs(mongoose.connection.db, mongoose.mongo);
})

router.post('/files', upload.any(), function(req, res, next){
    let file = req.files[0];
    let keywords = req.body.keywords ? req.body.keywords.split(',') : null;
    
    let newFile = {
      _studentId: req.body.studentId,
      date: req.body.date,
      comment: req.body.comment,
      keywords
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
      });
    });

    writestream.on('close', function(uploadedFile) {
      res.json(uploadedFile);
    });

    writestream.on('error', function(err) {
      next(err);
    });
});

router.get('/files/:id', function(req, res, next){
  let readstream = gfs.createReadStream({
    _id: req.params.id
  });

  readstream.pipe(res);
});

router.get('/files', function(req, res, next){
    gfs.files.find({ 'metadata._studentId': req.query.studentId }).toArray()
    .then((files) => {
      res.json(files);
    }).catch((err) => {
      next(err);
    })
});

// TODO return error codes
router.delete("/files/:id", function(req, res){
  let params = {_id: req.params.id };

  gfs.exist(params, function(err, found){
    if(err) return res.status(404).send("Error occured");
    if(found) {
      gfs.remove(params, function(err){
        if(err) return res.status(404).send("Error occured");
        res.json({ type: 'success', msg: 'File deleted' });
      });
    } else{
      res.status(404).send("No image found with that title");
    }
  });
});

module.exports = router;