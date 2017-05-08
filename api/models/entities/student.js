'use strict';

let mongoose = require('mongoose'),
 Schema = mongoose.Schema;

let StudentSchema = new Schema({
  name: { type: String },
  lastName: { type: String },
  fatherName: { type: String },
  motherName: { type: String },
  birthDate: { type: Date},
  avatar: { path: String, mimeType: String },
  school: { type: String },
  classNumber: { type: Number },
  series: { type: String },
  shift: { type: String },
  geralRegister: { type: Number },
  phoneNumber: { type: Number },
  responsible: { type: String},
  relationship: { type: String},
  address: { type: String},
  cid: { type: Number},
  historical: { type: String},
  specialNeeds: [{ type: String }],
  docParentsAproval: { path: String, mimeType: String },
  termOfUse: { type: Boolean },
  _createdBy: { type: String, ref: 'User' }, //Link to teacher model
  _schoolId: { type: String, ref: 'School' } //Link to school model
 });

// set up a mongoose model
const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;