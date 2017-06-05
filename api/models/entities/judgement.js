'use strict';

let mongoose = require('mongoose'),
 Schema = mongoose.Schema;

let JudgementSchema = new Schema({
  _createdBy: { type: String, ref: 'User' },
  _studentId: { type: String, ref: 'Student' },
  date: { type: Date },
  text: { type: String },
  type: { type: String }
 });

// set up a mongoose model
const Judgement = mongoose.model('Judgement', JudgementSchema);

module.exports = Judgement;