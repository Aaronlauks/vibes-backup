exports.run = async (bot, message, args) => {
    let connection = await message.member.voice.channel.join();
    const dispatcher = connection.play(`../Music/ACCF/1AM.mp3`, {
        volume: 1,
      });
      console.log("debug")
      dispatcher.on("end",function(){
          connection.disconnect();
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