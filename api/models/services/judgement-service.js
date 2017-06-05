'use strict';

let mongoose = require('mongoose');
let BaseService = require('../base-service');

class JudgementService extends BaseService {
    constructor() {
        super('judgement');
    }
}

module.exports = JudgementService;