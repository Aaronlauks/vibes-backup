const queueVoice = require('../models/queueChannel.js');
exports.run = async (bot, message, args) => {
    let queueChannel = await queueVoice.findOne({
        guildID: message.guild.id
      });
    if(!args[0]){
        message.channel.send(`🚨 Current prefix is \`${queueChannel.prefix}\``)
    } else {
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