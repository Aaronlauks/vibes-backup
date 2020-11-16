const queueVoice = require('../models/queueChannel.js');
exports.run = async (bot, message, guildID) => {
    let queueChannel = await queueVoice.findOne({
        guildID: guildID
      });
      let queueGuild = await queueVoice.findOne({
        ID: "42069"
      });
      if(!queueGuild.queue.includes(guildID)) return;
      if(queueChannel){
        let time;
        let genre;
        if(queueChannel.timezone != 0){
          time = new Date().getHours() + +queueChannel;
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
            time+="PM"
          } else {
            time+="AM"
          }
        } else {
          if(time == 12){
            time+="AM"
          } else {
            time+="PM"
          }
        }
        if(queueChannel.songType = "Animal Crossing **City Folk**"){
          genre = "ACCF"
        }
        console.log(time)
        let connection = await message.member.voice.channel.join()
        const dispatcher = connection.play(`./Music/${genre}/${time}.mp3`);
        dispatcher.on("finsih",async function(){
          queueChannel = await queueVoice.findOne({
            guildID: message.guild.id
          });
          let command = bot.commands.get(cmd);
          command.run(bot, message, guildID);
        });
        dispatcher.on('error', error => {
            console.log(error)
        });
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