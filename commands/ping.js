exports.run = (bot, message, args) => {
    message.channel.send(`<:notification:723073625040748576> hey, i'm still online bro`)
    console.log(`console is working too`)
}
module.exports.config = {
    name: "ping",
    description: "ping!!!!!!!!!!!",
    accessableby: "Everyone",
    usage: '!ping',
    aliases: ["pong"]
}