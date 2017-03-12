'use strict';

let mongoose = require('mongoose'),
 Schema = mongoose.Schema,
 SALT_WORK_FACTOR = 10,
 bcrypt = require('bcrypt');

let UserSchema = new Schema({
  email: { type: String,  index: { unique: true }, required: true, dropDups: true},
  password: { type: String, required: true },
  role: { type: String, required: true },//number to reduce payload
  name: { type: String, required: true },
  schoolId: { type: String }
 });

UserSchema.pre('save', function(next) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// set up a mongoose model
const User = mongoose.model('User', UserSchema);

module.exports = User;