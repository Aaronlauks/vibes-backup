exports.run = async (bot, message, args) => {
    message.channel.send("playng song")
    let connection = await message.member.voice.channel.join();
    const dispatcher = connection.play('http://www.sample-videos.com/audio/mp3/wave.mp3');
      console.log("debug")
      dispatcher.on("finish",function(){
          console.log("end?")
          dispatcher = connection.play('http://www.sample-videos.com/audio/mp3/wave.mp3');
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