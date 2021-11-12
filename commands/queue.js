const queueVoice = require('../models/queueChannel.js');
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
        const embed = new discord.MessageEmbed()
          .setTitle(`**${npargs[3]}** in **${genre}**`)
          .setAuthor(
            `Now playing:`,
            bot.user.avatarURL()
          )
          .setColor("#363940")
          .setFooter(queueChannel.np)
      if(queueChannel.songType == "none"){
        return message.channel.send(`<:xcross:690880230562201610> bro I'm not even playing anything`)
      } else {
        return message.channel.send(embed)
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