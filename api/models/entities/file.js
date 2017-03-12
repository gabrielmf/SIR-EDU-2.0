'use strict';

let mongoose = require('mongoose'),
 Schema = mongoose.Schema;

var fileSchema = new Schema({},{ strict: false });

// set up a mongoose model
const File = mongoose.model('File', fileSchema, 'fs.files');

module.exports = File;

