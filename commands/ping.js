exports.run = (bot, message, args) => {
    message.channel.send(`🔔 hey, i'm still online`)
    console.log(`console is working too`)
}
module.exports.config = {
    name: "ping",
    description: "ping!!!!!!!!!!!",
    accessableby: "Everyone",
    usage: 'ping',
    aliases: ["pong"]
}