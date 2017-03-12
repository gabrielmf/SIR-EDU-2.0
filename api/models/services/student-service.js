'use strict';

let mongoose = require('mongoose');
let BaseService = require('../base-service');

class StudentService extends BaseService {
    constructor() {
        super('student');
    }
}

module.exports = StudentService;