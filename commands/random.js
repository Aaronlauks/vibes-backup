const queueVoice = require('../models/queueChannel.js');
exports.run = async (bot, message, args) => {
    let queueChannel = await queueVoice.findOne({
        guildID: message.guild.id
      });
    if(!queueChannel) {
        return message.channel.send(`Error! Please rerun this command!`)
    } else {
        if(queueChannel.loop != "random"){
            queueChannel.loop = "random"
            message.channel.send(`🔢 Random queue enabled!`)
        }else{
            queueChannel.loop = ""
            message.channel.send(`▶️ Random queue disabled!`)
        }
    }
    await queueChannel.save().catch(e => console.log(e));
}
module.exports.config = {
    name: "random",
    description: "randomises the next song going to be played.",
    accessableby: "Everyone",
    usage: "random",
    aliases: ["randomize", "shuffle", "randomize"]
}
