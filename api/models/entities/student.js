'use strict';

let mongoose = require('mongoose'),
 Schema = mongoose.Schema;

let StudentSchema = new Schema({
  name: { type: String },
  fatherName: { type: String },
  motherName: { type: String },
  birthDate: { type: Date},
  avatar: { path: String, mimeType: String }, //Link to student image
  responsible: { type: String},
  relationship: { type: String},
  address: { type: String},
  cid: { type: Number},
  historical: { type: String},
  specialNeeds: [{ type: String }],
  docParentsAproval: { path: String, mimeType: String }, //Link to doc file
  termOfUse: { type: Boolean },
  _createdBy: { type: Number, ref: 'User' }, //Link to teacher model
  // _schoolId: { type: String} //Link to school model
 });

// set up a mongoose model
const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;