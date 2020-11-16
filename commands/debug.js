exports.run = async (bot, message, args) => {
    message.channel.send("playng song")
    let connection = await message.member.voice.channel.join();
    let dispatcher = connection.play('../Music/ACCF/1AM.mp3');
      console.log("debug")
      dispatcher.on("finish",function(){
          console.log("end?")
          dispatcher = connection.play('../Music/ACCF/1AM.mp3');
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