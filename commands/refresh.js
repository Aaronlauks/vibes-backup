const ytdl = require('ytdl-core');
const queueVoice = require('../models/queueChannel.js');
exports.run = async (bot, message, args) => {
  let queueChannel = await queueVoice.findOne({
      guildID: message.guild.id
    });
    let queueGuild = await queueVoice.findOne({
      ID: "42069"
    });
    if(!queueGuild.queue.includes(message.guild.id)) return message.channel.send(`<:xcross:690880230562201610> bro I'm not even playing anything`)
    if(queueChannel){
      let songNum
      if(queueChannel.songNum != 0){
      if(new Date().getMinutes() > 29){
          songNum = ((new Date().getHours() + +queueChannel.songNum) * 2) - 1;
          queueChannel.play = true;
      } else {
          songNum = ((new Date().getHours() + +queueChannel.songNum) * 2) - 2;
          queueChannel.play = false;
      } 
      if(new Date().getHours() + +queueChannel.songNum < 1) songNum += +48;
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
        dispatcher.on("end",function(){
            connection.disconnect();
        });
        dispatcher.on('error', error => {
            console.log(error)
        });
          message.channel.send(`↩️ Reloaded ${queueChannel.songType}!`)
          console.log(bot.guilds.cache.get(message.guild.id).name, queueChannel.songNum, new Date().getMinutes(), new Date().getSeconds())
      });
      } else {
        console.log(`deleted ${message.guild.id}`)
        queueGuild.queue.splice(queueGuild.queue.indexOf(message.guild.id), 1);
        message.channel.send(`<:xcross:690880230562201610> bro I'm not even playing anything`)
      }
    } else {
      console.log(`deleted ${message.guild.id}`)
      queueGuild.queue.splice(queueGuild.queue.indexOf(message.guild.id), 1);
      message.channel.send(`<:xcross:690880230562201610> bro I'm not even playing anything`);
    }
    queueChannel.running = false;
    await queueChannel.save().catch(e => console.log(e));
    await queueGuild.save().catch(e => console.log(e));
}
module.exports.config = {
    name: "refresh",
    description: "Refreshes the current song (use this if song suddenly stops D:).\nIf the bot still isn't playing anything, try stopping the bot \`!stop\` and running it again",
    accessableby: "Everyone",
    usage: "refresh",
    aliases: ["reload", "ref", "load"]
}