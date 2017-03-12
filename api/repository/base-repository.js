'use strict';

const mongoose = require('mongoose');

class BaseRepository {

  constructor (modelName) {
      this.Model = require('../models/entities/' + modelName);
  }

  findById(id) {
    return this.findOne({ _id : id });
  };

  findOne(params) {
    return this.Model.findOne(params).exec();
  };

  find(params) {
    return this.Model.find(params).exec();
  };

  save(obj) {
    let entity = new this.Model(obj);
    return entity.save();
  };

  update(entity) {
    return this.Model.findOneAndUpdate({_id : entity._id }, entity, { new : true }).exec();
  };

  delete(id) {
    return this.Model.findOneAndRemove({ _id: id }).exec();
  };


  deleteAll() {
    return this.Model.remove({}).exec();
  }

}

module.exports = BaseRepository;