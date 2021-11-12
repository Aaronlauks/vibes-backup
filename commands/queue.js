const queueVoice = require('../models/queueChannel.js');
const { MessageEmbed } = require("discord.js");
exports.run = async (bot, message, args) => {
    let queueGuild = await queueVoice.findOne({
        guildID: "42069"
      });
    if(queueGuild.guilds.includes(message.guild.id)){
        let queueChannel = await queueVoice.findOne({
            guildID: message.guild.id
          });
        let npargs = queueChannel.np.split("/");
        let genre = npargs[2];
        if(genre == "ACCF"){
          genre = "Animal Crossing **City Folk**"
        } else if(genre == "ACGCN"){
          genre = "Animal Crossing **Gamecube**"
        } else if(genre == "ACNH"){
          genre = "Animal Crossing **New Horizon**"
        }else if(genre == "ACNL"){
          genre = "Animal Crossing **New Leaf**"
        } else {
          genre = "(Error please use the command reload)"
        }
        let playType = "Default"
        if(queueChannel.loop != ""){
          if(queueChannel.loop != "random"){
            playType = "Loop"
          } else playType = "Random";
        }  
        const embed = new MessageEmbed()
          .setTitle(`**${npargs[3]}** from **${genre}**`)
          .setAuthor(
            `Now playing:`,
            bot.user.avatarURL()
          )
          .setColor("#363940")
          .setFooter(`Play type: ${playType}`)
      if(queueChannel.songType == "none"){
        return message.channel.send(`<:xcross:690880230562201610> bro I'm not even playing anything`)
      } else {
        return message.channel.send(`🎵 Now playing: **${npargs[3]}** in **${genre}**`)
      }
    } else return message.channel.send(`<:xcross:690880230562201610> bro I'm not even playing anything`)
}
module.exports.config = {
    name: "nowplay",
    description: "Shows the music playing now",
    accessableby: "Everyone",
    usage: "nowplay",
    aliases: ["q", "queue", "np", "song"]
  }