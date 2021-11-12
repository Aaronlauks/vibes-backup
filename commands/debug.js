exports.run = async (bot, message, args) => {
    message.channel.send("\🐞 **playing song**. Check whether the sound is working and playing.").then(async m => {
        let connection = await message.member.voice.channel.join();
        let dispatcher = connection.play('https://cdn.discordapp.com/attachments/653147383437459456/908564717654663199/amgus.mp3');
        console.log("debug")
        dispatcher.on("finish", function () {
            console.log("end?")
            connection.disconnect();
            m.edit(`\☠️ Debug song ended.`)
        });
        dispatcher.on('error', error => {
            console.log(error)
        });
    })
}
module.exports.config = {
    name: "debug",
    description: "random song to test whether bot connection is working",
    accessableby: "Everyone",
    usage: "debug",
    aliases: ["bug", "test", "soundtest"]
}