const queueVoice = require('../models/queueChannel.js');

exports.run = async (bot, message, args) => {
    let queueGuild = await queueVoice.findOne({
        guildID: "42069"
      });
      let queueChannel = await queueVoice.findOne({
        guildID: message.guild.id
      });
      if(queueChannel.loop == ""){
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
        time-=12;
        if(time == 12){
          time+="AM"
        } else {
          time+="PM"
        }
      } else {
        if(time == 12){
          time+="PM"
        } else {
          time+="AM"
        }
      }
      queueChannel.loop = time;
      message.channel.send(`looped ${time} ${queueChannel.songType}!`);
      await queueChannel.save().catch(e => console.log(e));
      } else {
        queueChannel.loop = "";
        message.channel.send(`unlooped song!`)
        await queueChannel.save().catch(e => console.log(e));
      }
      if(!queueGuild.guilds.includes(message.guild.id)) return message.channel.send(`Nothing is playing`)

}
module.exports.config = {
    name: "loop",
    description: "dont use this command",
    accessableby: "Everyone",
    usage: "!loop",
    aliases: ['repeat']
}