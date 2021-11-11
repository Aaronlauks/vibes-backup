const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  guildID: String,
  voiceID: String,
  songType: String,
  timezone: String,
  prefix: String,
  running: Boolean,
  loop: String,
  guilds: Array
});

module.exports = mongoose.model("queueChannel", messageSchema);