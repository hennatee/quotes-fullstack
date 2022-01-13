const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SCHEMA_DEFAULTS = {
  author: {
    minLength: 1
  },
  description: {
    minLength: 1
  },
  likes: {
    default: 0
  }
};

const quoteSchema = new Schema({
  userId: {
   $type: String,
   required: true 
  },
  author: {
    $type: String,
    required: true, 
    minLength: SCHEMA_DEFAULTS.author.minLength
  },
  description: {
    $type: String,
    required: true, 
    minlength: SCHEMA_DEFAULTS.description.minLength
  },
  likes: {
    $type: Number,
    required: true, 
    default: SCHEMA_DEFAULTS.likes.default
  }
}, { typeKey: '$type' } )

// Omit the version key when serialized to JSON
quoteSchema.set('toJSON', { 
  virtuals: false, 
  versionKey: false 
});

const Quote = new mongoose.model('Quote', quoteSchema)
module.exports = Quote