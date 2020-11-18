exports.run = async (bot, message, args) => {
    message.channel.send("playing random relaxing song lol")
    let connection = await message.member.voice.channel.join();
    let dispatcher = connection.play('https://www.sample-videos.com/audio/mp3/wave.mp3');
      console.log("debug")
      dispatcher.on("finish",function(){
          console.log("end?")
          connection.disconnect();
      });
      dispatcher.on('error', error => {
          console.log(error)
      });
}
module.exports.config = {
    name: "debug",
    description: "random song to test whether bot connection is working",
    accessableby: "Everyone",
    usage: "debug",
    aliases: ["bug", "de"]
}