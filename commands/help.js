const discord = require('discord.js')
exports.run = async (bot, message, args) => {
    if(!args[0]){
    const embed = new discord.MessageEmbed()
    .setColor('#'+(Math.random()*0xFFFFFF<<0).toString(16))
      .setAuthor(`Animal Crossing 24/7`, message.guild.iconURL())
      .setThumbnail(bot.user.avatarURL())
      .setFooter(
        `Type !help <command> for more info`,
        bot.user.displayAvatarURL()
      );
      let descm = `These are the available commands for **${bot.user.tag}**\nThe bot prefix is: **!**\n\n`;

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
      .setAuthor(`Help is on the way!`, message.guild.iconURL())
      .setThumbnail(bot.user.avatarURL())
      .setDescription(
        `The bot prefix is: **!**\n`
      )
      .addField(`**Command:**`, `${command.config.name || "Not Set"}`)
      .addField(`**Description:**`, `${command.config.description || "Not Set"}`)
      .addField(`**Usage:**`, `${command.config.usage || "Not Set"}`)
      .addField(`**Aliases:**`, `${command.config.aliases || "Not Set"}`)
      .setFooter(
        `${message.guild.me.displayName} help command`,
        bot.user.displayAvatarURL()
      );
      message.channel.send(embed);
    }
}
module.exports.config = {
    name: "help",
    description: "This is the help command so uhh...",
    category: "Miscellaneous",
    usage: "!help <command>",
    accessableby: "Everyone",
    aliases: ["h", "halp", "info"]
  }