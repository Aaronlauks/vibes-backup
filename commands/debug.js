exports.run = async (bot, message, args) => {
    message.channel.send("playng song")
    let connection = await message.member.voice.channel.join();
    let dispatcher = connection.play('https://vocaroo.com/19Z7hyaWA2XU');
      console.log("debug")
      dispatcher.on("finish",function(){
          console.log("end?")
          dispatcher = connection.play('https://vocaroo.com/19Z7hyaWA2XU');
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