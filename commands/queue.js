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
        if(queueChannel.songNum != 0){
          time = new Date().getHours() + +queueChannel.songNum;
        } else {
          time = new Date().getHours();
        }
        if(time < 13){
          if(time < 0){
            time = parseInt(time) + 12;
            if(time == 12) {
              time += "AM";
            } else {
              time += "PM";
            }
          } else {
          if(time == 12) {
            time += "PM";
          } else if(time == 0) {
            time = "AM";
          } else {
            time += "12AM";
          }
        }
      } else {
          time = time - 12;
          if(time > 12){
            time = time - 12;
          if(time == 12) {
            time += "PM";
          } else {
            time += "AM";
          }
        } else {
        if(time == 12) {
          time += "AM";
        } else {
          time += "PM";
        }
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