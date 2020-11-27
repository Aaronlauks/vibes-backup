const { MessageEmbed } = require("discord.js");

exports.run = async (bot, message, args, ops) => {
  const embed = new MessageEmbed()
  .setTitle(`Vibes`)
  .setURL(`https://discord.com/login?redirect_to=%2Foauth2%2Fauthorize%3Fclient_id%3D696032366845624392%26scope%3Dbot%26permissions%3D8`)
  .setAuthor(
        `Click the link below for the bot invite:`,
        bot.user.avatarURL()
  )
  .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
  .setFooter(`Made by Aaronlanjiao#5054`)
  message.channel.send(embed)
}

module.exports.config = {
  name: "invite",
  description: "Gives you the invite link of this bot",
  usage: `invite`,
  accessableby: "Everyone",
  aliases: ["link", "invites", "botinvite", "invitation", "invit"]
}