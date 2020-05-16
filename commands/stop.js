exports.run = async (bot, message, args, recent) => {
    let queueGuild = await queueVoice.findOne({
        guildID: "42069"
      });
    if(queueGuild.queue.includes(message.guild.id)){
        queueGuild.queue.splice(queueGuild.queue.indexOf(message.guild.id), 1)
        message.channel.send(`<:tickGreen:690880245611626597> Stopped plaing Animal Crossing D:`)
        await queueGuild.save().catch(e => console.log(e));
    } else return message.channel.send(`<:xcross:690880230562201610> bro I'm not even playing anything`)
}
module.exports.config = {
    name: "stop",
    description: "stop",
    accessableby: "Everyone",
    aliases: ["delete", "fuckoff"]
}