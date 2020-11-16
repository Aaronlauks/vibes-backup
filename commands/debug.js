exports.run = async (bot, message, args) => {
    message.channel.send("playng song")
    let connection = await message.member.voice.channel.join();
    let dispatcher = connection.play('https://cdn.discordapp.com/attachments/777785367607771146/777785471065391144/1AM.mp3');
      console.log("debug")
      dispatcher.on("finish",function(){
          console.log("end?")
          dispatcher = connection.play('https://cdn.discordapp.com/attachments/777785367607771146/777785471065391144/1AM.mp3');
      });
      dispatcher.on('error', error => {
          console.log(error)
      });
}
module.exports.config = {
    name: "debug",
    description: "debu",
    accessableby: "Everyone",
    usage: "debug",
    aliases: ["bug", "de"]
}