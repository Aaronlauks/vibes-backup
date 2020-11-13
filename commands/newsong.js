const ytdl = require('ytdl-core');
const queueVoice = require('../models/queueChannel.js');
exports.run = async (bot, guildID) => {
  let buffer = 0;
    let queueChannel = await queueVoice.findOne({
        guildID: guildID
      });
      let queueGuild = await queueVoice.findOne({
        ID: "42069"
      });
      queueGuild.songNum++;
      if(!queueGuild.queue.includes(guildID)) return;
      if(queueChannel){
        let songNum
        if(queueChannel.songNum != 0){
          if(new Date().getHours() + +queueChannel.songNum > 24) buffer = -24;
          if(new Date().getHours() + +queueChannel.songNum <= 0) buffer = +24;
      if(new Date().getMinutes() > 29){
          songNum = ((new Date().getHours() + +queueChannel.songNum + buffer) * 2) - 1;
          queueChannel.play = true;
      } else {
          songNum = ((new Date().getHours() + +queueChannel.songNum + buffer) * 2) - 2;
          queueChannel.play = false;
      } 
    } else {
        if(new Date().getMinutes() > 29){
            songNum = new Date().getHours() * 2 - 1;
            queueChannel.play = true;
        } else {
            songNum = new Date().getHours() * 2 - 2;
            queueChannel.play = false;
        } 
        if(new Date().getHours() == 0) songNum += +48;
    }
    const channel = bot.channels.cache.get(queueChannel.voiceID);
        if (channel) {
          let music = queueChannel.queue[songNum];
        await channel.join().then(async connection => {
          const dispatcher = await connection.play(ytdl(music))
          dispatcher.on('error', error => {
              console.log(error)
          });
            console.log(bot.guilds.cache.get(guildID).name, songNum, music)
        });
        } else {
          console.log(`deleted ${guildID}`)
          queueGuild.queue.splice(queueGuild.queue.indexOf(guildID), 1);
        }
      await queueChannel.save().catch(e => console.log(e));
      await queueGuild.save().catch(e => console.log(e));
    } else return;
}
module.exports.config = {
    name: "NEWSONG",
    description: "dont use this command",
    accessableby: "Everyone",
    usage: "!refresh",
    aliases: []
}