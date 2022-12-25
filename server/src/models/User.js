import mongoose from 'mongoose';
import crypto from 'crypto';
import modelOptions from './modelOptions.js';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      required: true,
      select: false,
    },
  },
  modelOptions
);

//set the password for a user
userSchema.method.setPassword = function (password) {
  //generates a random salt
  this.salt = crypto.randomBytes(16).toString('hex');
  //hash the password using the salt.
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');
};

// check whether a given password is correct for a user.
userSchema.method.validatePassword = function (password) {
  //generates a hash of the given password using the same salt that was used to hash the user's password
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
    .toString('hex');

  //compares the resulting hash to the stored password hash
  return this.password === hash;
};

const userModel = mongoose.model('User', userSchema);

export default userModel;
