const ytdl = require('ytdl-core');
const queueVoice = require('../models/queueChannel.js');
exports.run = async (bot) => {
    console.log(`running new refresh`)
    setInterval (async function () {
        if(new Date().getSeconds() == 0){
          if(new Date().getMinutes() == (30 || 0)){
        let queueGuild = await queueVoice.findOne({
          ID: "42069"
        });
        if(queueGuild){
        queueGuild.queue.forEach(async guildID => {
          let queueChannel = await queueVoice.findOne({
            guildID: guildID
          });
          if(queueChannel){
          if(new Date().getMinutes() == 0 && queueChannel.play == true){
            queueChannel.play = false;
            console.log(queueChannel.songNum, new Date().getMinutes(), new Date().getSeconds())
            music = queueChannel.queue[queueChannel.songNum];
            const channel = bot.channels.cache.get(queueChannel.voiceID);
            startPlay = false;
            channel.join().then(async connection => {
              let dispatcher = await connection.play(ytdl(music));
          }).catch(e => console.error(e));
            
            queueChannel.songNum++;
            if(queueChannel.songNum > 47) queueChannel.songNum = 0;
            await queueChannel.save().catch(e => console.log(e));
            command = bot.commands.get("queueRefresh");
            command.run(bot);
        } else if(new Date().getMinutes() == 30 && !queueChannel.play){
          queueChannel.play = true;
            console.log(queueChannel.songNum, new Date().getMinutes(), new Date().getSeconds())
            music = queueChannel.queue[queueChannel.songNum];
            const channel = bot.channels.cache.get(queueChannel.voiceID);
            startPlay = false;
            channel.join().then(async connection => {
              let dispatcher = await connection.play(ytdl(music));
          }).catch(e => console.error(e));
            queueChannel.songNum++;
            if(queueChannel.songNum > 47) queueChannel.songNum = 0;
            await queueChannel.save().catch(e => console.log(e));
            command = bot.commands.get("queueRefresh");
            command.run(bot);
        } else {
            //console.log(new Date().getSeconds())
        }
      } else {
        queueGuild.queue.splice(queueGuild.queue.indexOf(guildID), 1);
        await queueGuild.save().catch(e => console.log(e));
      }
        });
      }
    }
    }
    })
}
module.exports.config = {
    name: "queueRefresh",
    description: "stop",
    accessableby: "Everyone",
    aliases: ["qwefrgvrb"]
}