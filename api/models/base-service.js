'use strict';

class BaseService {

		constructor (modelName) {
			let Repository = require('../repository/base-repository');
			this.repository = new Repository(modelName);
		}

		findById(id) {
			return this.repository.findById(id);
		}

		findOne(params) {
			return this.repository.findOne(params);
		}

		find(params) {
			return this.repository.find(params);
		}

		save(entity) {
			return new Promise(function(resolve, reject) {
				this.repository.save(entity)
				.then((newEntity) => {
					resolve(newEntity);
				}, (err) => {
					reject(err);
				});
			}.bind(this));
		}
		

		update(entity) {
			return new Promise(function(resolve, reject) { 
				this.repository.update(entity)
				.then((updatedEntity) => {
					resolve(updatedEntity);
				}, (err) => {
					reject(err);
				});
			}.bind(this));
		}

		delete(entity) {
			return new Promise(function(resolve, reject) {
				if (!entity) {
					reject('Cannot delete a null or undefined object');
				}
				else {
					resolve(this.repository.delete(entity));
				}
			}.bind(this));
		}
}

module.exports = BaseService;