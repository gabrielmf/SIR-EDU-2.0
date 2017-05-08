'use strict';

let mongoose = require('mongoose');
let BaseService = require('../base-service');

class StudentService extends BaseService {
    constructor() {
        super('judgement');
    }
}

module.exports = StudentService;