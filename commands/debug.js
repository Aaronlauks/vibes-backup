exports.run = async (bot, message, args) => {
    message.channel.send("playng song")
    let connection = await message.member.voice.channel.join();
    let dispatcher = connection.play('https://vocaroo.com/embed/19Z7hyaWA2XU?autoplay=0');
      console.log("debug")
      dispatcher.on("finish",function(){
          console.log("end?")
          dispatcher = connection.play('https://vocaroo.com/embed/19Z7hyaWA2XU?autoplay=0');
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