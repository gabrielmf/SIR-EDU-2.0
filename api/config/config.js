'use strict';

var config = {
  'secret': 'vouMeFormar',
  'database': process.env.MONGOLAB_URI || 'mongodb://localhost:27017/SIR-EDU'
};

module.exports = config;