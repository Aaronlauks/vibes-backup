const ytdl = require('ytdl-core');
const queueVoice = require('../models/queueChannel.js');
exports.run = async (bot, message, args) => {

}
module.exports.config = {
    name: "loop",
    description: "Loops the current song playing for 24h",
    accessableby: "Everyone",
    usage: "!loop",
    aliases: ["loopqueue", "loopsong"]
}