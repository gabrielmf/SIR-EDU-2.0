'use strict';

let mongoose = require('mongoose'),
 Schema = mongoose.Schema;

let SchoolSchema = new Schema({
  name: { type: String },
  mapLocation: { type: [Number], index: '2d' },
  cep: { type: Number },
  adress: { type: String },
  adressNum: { type: Number },
  district: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String }
 });

// set up a mongoose model
const School = mongoose.model('School', SchoolSchema);

module.exports = School;