const { MessageEmbed } = require("discord.js");

exports.run = async (bot, message, args, ops) => {
  const embed = new MessageEmbed()
  .setTitle(`Chill Beats`)
  .setURL(`https://discord.com/oauth2/authorize?client_id=777582718422745138&scope=bot&permissions=8`)
  .setAuthor(
        `Click the link below for the bot invite:`,
        bot.user.avatarURL()
  )
  .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16));
  message.channel.send(embed)
}

module.exports.config = {
  name: "invite",
  description: "Gives you the invite link of this bot",
  usage: `invite`,
  accessableby: "Everyone",
  aliases: ["link", "invites", "botinvite", "invitation", "invit"]
}