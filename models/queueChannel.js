const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  guildID: String,
  queue: Array,
  voiceID: String,
  songNum: String,
  play: Boolean,
  prefix: String
});

module.exports = mongoose.model("queueChannel", messageSchema);