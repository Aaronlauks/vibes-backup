const queueVoice = require('../models/queueChannel.js');
exports.run = async (bot, message, args) => {
    let queueChannel = await queueVoice.findOne({
        guildID: message.guild.id
    });
    const channel = bot.channels.cache.get(queueChannel.voiceID);
    channel.leave();
    let command = bot.commands.get("NEWSONG");
    setTimeout(function(){
        command.run(bot, guildID);
        message.channel.send(`↪️ Reloaded vibes for you. Hope it worked :)`)
    },1000);
}
module.exports.config = {
    name: "reload",
    description: "If vibes doesn't work and the song is not loading, use this command.",
    accessableby: "Everyone",
    usage: "reload",
    aliases: ["r", "reset", "replay"]
}
