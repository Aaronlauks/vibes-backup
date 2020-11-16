const queueVoice = require('../models/queueChannel.js');
exports.run = async (bot, message, args) => {
    let queueGuild = await queueVoice.findOne({
        guildID: "42069"
      });
    if(queueGuild.guilds.includes(message.guild.id)){
        let queueChannel = await queueVoice.findOne({
            guildID: message.guild.id
          });
        if(queueChannel.timezone != 0){
          time = new Date().getHours() + +queueChannel.timezone;
          if(time > 24){
            time-=24;
          } else if(time < 1){
            time+=24;
          }
        } else {
          time = new Date().getHours();
        }
        if(time > 12){
          if(time == 12){
            time+="AM"
          } else {
            time+="PM"
          }
        } else {
          time-=12;
          if(time == 12){
            time+="PM"
          } else {
            time+="AM"
          }
        }
      if(queueChannel.songType == "none"){
        return message.channel.send(`<:xcross:690880230562201610> bro I'm not even playing anything`)
      } else {
        return message.channel.send(`🎵 Now playing: ${time} ${queueChannel.songType}`)
      }
    } else return message.channel.send(`🎵 Now playing: ${time} ${queueChannel.songType}`)
}
module.exports.config = {
    name: "nowplay",
    description: "Shows the music playing now",
    accessableby: "Everyone",
    usage: "nowplay",
    aliases: ["q", "queue", "np", "song"]
  }