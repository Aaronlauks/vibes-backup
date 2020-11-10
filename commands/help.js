const discord = require('discord.js')
const queueVoice = require('../models/queueChannel.js');
exports.run = async (bot, message, args) => {
  let queueChannel = await queueVoice.findOne({
    guildID: message.guild.id
  });
if(!queueChannel) {
    queueChannel = new queueVoice({
        guildID: message.guild.id,
        queue: [""],
        voiceID: message.member.voice.channel.id,
        songNum: 0,
        songType: "none",
        interval: "none",
        play: true,
        prefix: "!"
    });
}
    if(!args[0]){
    const embed = new discord.MessageEmbed()
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
      .setAuthor(`Animal Crossing 24/7`, bot.user.displayAvatarURL())
      .setThumbnail(bot.user.avatarURL())
      .setFooter(`Type ${queueChannel.prefix}help <command> for more info`);
      let descm = `These are the available commands for **Vibes**\nThe bot prefix is: **${queueChannel.prefix}**\n\n`;

      bot.commands.forEach(m => {
          if(m.config.name != "NEWSONG") descm+=`\`${m.config.name}\` `;
      });
      embed.setDescription(descm);
      message.channel.send(embed)
    } else {
        let command = args[0];
      if(bot.commands.get(command)){
        command = bot.commands.get(command);
      } else {
        command = bot.commands.get(bot.aliases.get(command));
       }

       const embed = new discord.MessageEmbed()
       .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
      .setAuthor(`Vibes help command`, bot.user.displayAvatarURL())
      .setThumbnail(bot.user.avatarURL())
      .setDescription(
        `The bot prefix is: **${queueChannel.prefix}**\n`
      )
      .addField(`**Command:**`, `${command.config.name || "Not Set"}`)
      .addField(`**Description:**`, `${command.config.description || "Not Set"}`)
      .addField(`**Usage:**`, `${queueChannel.prefix}${command.config.usage || "Not Set"}`)
      .addField(`**Aliases:**`, `${command.config.aliases || "Not Set"}`)
      message.channel.send(embed);
    }
}
module.exports.config = {
    name: "help",
    description: "This is the help command so uhh...",
    category: "Miscellaneous",
    usage: "help <command>",
    accessableby: "Everyone",
    aliases: ["h", "halp", "info"]
  }