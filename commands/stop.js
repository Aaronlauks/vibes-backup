exports.run = async (bot, message, args, recent) => {
    recent.get(message.guild.id).delete()
}
module.exports.config = {
    name: "stop",
    description: "stop",
    accessableby: "Everyone",
    aliases: ["delete", "fuckoff"]
}