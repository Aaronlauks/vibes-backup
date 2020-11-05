const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  guildID: String,
  queue: Array,
  voiceID: String,
  songNum: String,
  songType: String,
  play: Boolean,
  prefix: String,
  running: Boolean
});

module.exports = mongoose.model("queueChannel", messageSchema);