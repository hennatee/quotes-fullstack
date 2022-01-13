const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//SALT_ROUNDS can be used when hashing the password with bcrypt.hashSync()
const SALT_ROUNDS = 10;

const SCHEMA_DEFAULTS = {
  name: {
    minLength: 2,
    maxLength: 50
  },
  email: {
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    minLength: 8
  },
  role: {
    values: ['admin', 'user'],
    defaultValue: 'user'
  }
};

const userSchema = new Schema({
  name: {
    $type: String,
    required: true, 
    trim: true,
    minLength: SCHEMA_DEFAULTS.name.minLength,
    maxLength: SCHEMA_DEFAULTS.name.maxLength
  },
  email: {
    $type: String,
    required: true, 
    unique: true,
    trim: true, 
    match: SCHEMA_DEFAULTS.email.match
  },
  password: {
    $type: String,
    required: true, 
    minLength: SCHEMA_DEFAULTS.password.minLength,
    set: password => {
      if (password === null || password.length < SCHEMA_DEFAULTS.password.minLength) return password
      return bcrypt.hashSync(password, SALT_ROUNDS)
    }
  },
  role: { 
    $type: String,
    required: true,
    trim: true, 
    lowercase: true, 
    enum: SCHEMA_DEFAULTS.role.values,
    default: SCHEMA_DEFAULTS.role.defaultValue
  }
}, { typeKey: '$type' } )

userSchema.path('password').validate(function (password) {
  if (password.length < SCHEMA_DEFAULTS.password.minLength) return false; 
  return true;
}, 'Password is too short')

 

// Omit the version key when serialized to JSON
userSchema.set('toJSON', { 
  virtuals: false, 
  versionKey: false 
})

const User = new mongoose.model('User', userSchema)
module.exports = User