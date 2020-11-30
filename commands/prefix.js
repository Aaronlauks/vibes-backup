const queueVoice = require('../models/queueChannel.js');
exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission('MANAGE_SERVER')) return message.channel.send(`<:xcross:690880230562201610> You need the permisson \`MANAGE SERVER\` to change the prefix of this server :L`)
    let queueChannel = await queueVoice.findOne({
        guildID: message.guild.id
      });
    if(!args[0]){
        message.channel.send(`🚨 Current prefix is \`${queueChannel.prefix}\``)
    } else {
        let char = args[0].split("");
        if(char.length > 10) return message.channel.send(`<:xcross:690880230562201610> The prefix cannot be longer than 10 characters!`)
        queueChannel.prefix = args.join(" ");
        message.channel.send(`🎧 Changed prefix to \`${args.join(" ")}\``)
        await queueChannel.save().catch(e => console.log(e));
    }
}
module.exports.config = {
    name: "prefix",
    description: "Changes the server's prefix for the bot",
    accessableby: "Everyone",
    usage: "prefix <prefix>",
    aliases: ["prefix"]
}