const mongoose = require('mongoose');
const textSearch = require('mongoose-partial-full-search');

const ClassSchema = new mongoose.Schema({
  videoUrl: String,
  title: String,
  thumbnailSlug: String,
  songs: String,
  level: String,
  instructor: String,
  userIds: [{
    userId: String,
    progress: Number,
    timestamp: String,
    percentWatched: String,
    timeInClass: String
  }]
});

ClassSchema.plugin(textSearch);

ClassSchema.index({ title: "text", songs: "text", level: "text", instructor: "text" });

module.exports = mongoose.model('Classes', ClassSchema);
