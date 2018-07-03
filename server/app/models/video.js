// model/video.js
const mongoose = require('mongoose');

//  defining schema
const videoSchema = mongoose.Schema(
  {
    title: String,
    videourl: String,
    description: String,
    key: String,
    user_id: Object,
  },
);

module.exports = mongoose.model('Video', videoSchema);
