const ytdl = require('ytdl-core');
const queueVoice = require('../models/queueChannel.js');
exports.run = async (bot, message, args) => {
    let queueGuild = await queueVoice.findOne({
        ID: "42069"
      });
      if(!queueGuild.queue.includes(message.guild.id)) return message.channel.send(`<:xcross:690880230562201610> bro I'm not even playing anything`)
    let queueChannel = await queueVoice.findOne({
        guildID: message.guild.id
      });
      if(queueChannel){
        let songNum
        if(queueChannel.songNum != 0){
        if(new Date().getMinutes() > 29){
            songNum = ((new Date().getHours() + +queueChannel.songNum) * 2) - 1;
            queueChannel.play = true;
        } else {
            songNum = ((new Date().getHours() + +queueChannel.songNum) * 2) - 2;
            queueChannel.play = false;
        } 
        if(new Date().getHours() + +queueChannel.songNum < 1) songNum += +48;
    } else {
        if(new Date().getMinutes() > 29){
            songNum = new Date().getHours() * 2 - 1;
            queueChannel.play = true;
        } else {
            songNum = new Date().getHours() * 2 - 2;
            queueChannel.play = false;
        } 
        if(new Date().getHours() == 0) songNum += +48;
    }
    let music = queueChannel.queue[songNum];
    let musicArray = [
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music,
        music
    ]
    queueChannel.queue = musicArray;
    message.channel.send(`🔃 looped current song in queue!`)
    await queueChannel.save().catch(e => console.log(e));
      } else return message.channel.send(`<:xcross:690880230562201610> bro I'm not even playing anything`);
}
module.exports.config = {
    name: "loop",
    description: "Loops the current song playing for 24h. Running the 24h animal crossing command will unloop it \`e.g. !accf, !acnh\`",
    accessableby: "Everyone",
    usage: "loop",
    aliases: ["loopqueue", "loopsong"]
}