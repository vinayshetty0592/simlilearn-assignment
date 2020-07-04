const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('config');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  mobileNumber: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
},
  {
    timestamps: true
  });

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, config.get('PASSWORD_SALT_LENGTH'));
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', UserSchema);
module.exports = User;