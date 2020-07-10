const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  videoUrl: String,
  title: String,
  thumbnailSlug: String,
  songs: String,
  level: String,
  instructor: String
})

module.exports = mongoose.model('Classes', ClassSchema)
