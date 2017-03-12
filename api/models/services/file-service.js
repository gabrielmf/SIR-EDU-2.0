'use strict';

let mongoose = require('mongoose');
let BaseService = require('../base-service');

class FileService extends BaseService {
	constructor() {
		super('file');
	}
}

module.exports = FileService;