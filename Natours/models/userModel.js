const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us tour name!'],
  },
  email: {
    type: String,
    required: [true, 'User must have email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'User must have password'],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      //works only for create and save
      validator: function (el) {
        return el === this.password;
      },
      nessage: 'Passwords are not the same',
    },
  },
  passwordChangedAt: Date,
});
userSchema.pre('save', async function (next) {
  // Only runs if pass was actualy modified
  if (!this.isModified('password')) return next();

  //Hash the pass with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  //False means NOT changed
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
