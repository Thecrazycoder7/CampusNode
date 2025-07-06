const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  year: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;