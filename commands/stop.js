exports.run = async (bot, message, args, recent) => {
    if(recent.has(message.guild.id)){
        recent.delete(message.guild.id);
        message.channel.send(`<:tickGreen:690880245611626597> Stopped plaing Animal Crossing D:`)
    } else return message.channel.send(`<:xcross:690880230562201610> bro I'm not even playing anything`)
}
module.exports.config = {
    name: "stop",
    description: "stop",
    accessableby: "Everyone",
    aliases: ["delete", "fuckoff"]
}