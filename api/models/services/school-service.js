'use strict';

let mongoose = require('mongoose');
let BaseService = require('../base-service');

class SchoolService extends BaseService {
    constructor() {
        super('school');
    }
}

module.exports = SchoolService;