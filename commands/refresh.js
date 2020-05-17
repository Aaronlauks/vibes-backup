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
        message.channel.send(`<:tickGreen:690880245611626597> reloaded Queue!`)
        music = queueChannel.queue[queueChannel.songNum];
        const channel = bot.channels.cache.get(queueChannel.voiceID);
        channel.join().then(async connection => {
          let dispatcher = await connection.play(ytdl(music));
      }).catch(e => console.error(e));
      } else return message.channel.send(`<:xcross:690880230562201610> Hey, theres no music active?`);
}
module.exports.config = {
    name: "refresh",
    description: "stop",
    accessableby: "Everyone",
    aliases: ["reload", "ref", "load"]
}