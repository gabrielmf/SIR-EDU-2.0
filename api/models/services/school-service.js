'use strict';

let mongoose = require('mongoose');
let School = require('../entities/school');

class SchoolService {
    constructor() {
    }

    static getSchool(id) {
        return School.findById(id);
    }

    static saveSchool(newSchool) {
        return new School(newSchool).save();
    }

    static getAll() {
        return School.find();
    }
}

module.exports = SchoolService;