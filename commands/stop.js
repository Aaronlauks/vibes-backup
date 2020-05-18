const ytdl = require('ytdl-core');
const queueVoice = require('../models/queueChannel.js');
exports.run = async (bot, message, args) => {
    let queueGuild = await queueVoice.findOne({
        ID: "42069"
      });
    if(queueGuild.queue.includes(message.guild.id)){
        let queueChannel = await queueVoice.findOne({
            guildID: message.guild.id
          });
          const channel = bot.channels.cache.get(queueChannel.voiceID);
          channel.leave();
        queueGuild.queue.splice(queueGuild.queue.indexOf(message.guild.id), 1)
        message.channel.send(`<:tickGreen:690880245611626597> Stopped playing Animal Crossing :CC`)
        await queueGuild.save().catch(e => console.log(e));
    } else return message.channel.send(`<:xcross:690880230562201610> bro I'm not even playing anything`)
}
module.exports.config = {
    name: "stop",
    description: "Stops and deletes 24h queue",
    accessableby: "Everyone",
    usage: "!stop",
    aliases: ["delete", "fuckoff", "remove"]
}
