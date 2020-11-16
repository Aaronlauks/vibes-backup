const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  guildID: String,
  queue: Array,
  voiceID: String,
  songType: String,
  timezone: String,
  prefix: String,
  running: Boolean,
  loop: String
});

module.exports = mongoose.model("queueChannel", messageSchema);