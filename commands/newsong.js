const ytdl = require('ytdl-core');
const queueVoice = require('../models/queueChannel.js');
exports.run = async (bot, guildID) => {
    let queueChannel = await queueVoice.findOne({
        guildID: guildID
      });
      let queueGuild = await queueVoice.findOne({
        ID: "42069"
      });
      let music = "";
      if(queueChannel){
      if(new Date().getMinutes() == 0 && queueChannel.play == true){
        queueChannel.play = false;
        console.log(bot.guilds.cache.get(guildID).name, queueChannel.songNum, new Date().getMinutes(), new Date().getSeconds())
        music = queueChannel.queue[queueChannel.songNum];
        const channel = bot.channels.cache.get(queueChannel.voiceID);
        if(channel){
          await channel.join().then(async connection => {
          await connection.play(ytdl(music));
      }).catch(e => console.error(e));
        
        queueChannel.songNum++;
        if(queueChannel.songNum > 47) queueChannel.songNum = 0;
    } else queueGuild.queue.splice(queueGuild.queue.indexOf(guildID), 1);
    } else if(new Date().getMinutes() == 30 && !queueChannel.play){
      queueChannel.play = true;
      console.log(bot.guilds.cache.get(guildID).name, queueChannel.songNum, new Date().getMinutes(), new Date().getSeconds())
        music = queueChannel.queue[queueChannel.songNum];
        const channel = bot.channels.cache.get(queueChannel.voiceID);
        if (channel){
        await channel.join().then(async connection => {
          await connection.play(ytdl(music));
      }).catch(e => console.error(e));
        queueChannel.songNum++;
        if(queueChannel.songNum > 47) queueChannel.songNum = 0;
    } else queueGuild.queue.splice(queueGuild.queue.indexOf(guildID), 1);
    } else {
        const channel = bot.channels.cache.get(queueChannel.voiceID);
        if (channel) {
            music = queueChannel.queue[queueChannel.songNum];
        await channel.join().then(async connection => {
            await connection.play(ytdl(music));
            console.log(bot.guilds.cache.get(guildID).name, queueChannel.songNum, new Date().getMinutes(), new Date().getSeconds())
        }).catch(e => console.error(e));
    } else queueGuild.queue.splice(queueGuild.queue.indexOf(guildID), 1);
    }
  } else {
    queueGuild.queue.splice(queueGuild.queue.indexOf(guildID), 1);
  }
  await queueChannel.save().catch(e => console.log(e));
  await queueGuild.save().catch(e => console.log(e));
}
module.exports.config = {
    name: "NEWSONG",
    description: "dont use this command",
    accessableby: "Everyone",
    usage: "!refresh",
    aliases: []
}