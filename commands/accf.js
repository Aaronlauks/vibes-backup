const queueVoice = require('../models/queueChannel.js');

exports.run = async (bot, message, args) => {
    if (message.member.voice.channel) {
        let queueGuild = await queueVoice.findOne({
            ID: "42069"
          });
          if(!queueGuild.queue){
              queueGuild.queue = [`${message.guild.id}`]
          } else if(!queueGuild.queue.includes(message.guild.id))queueGuild.queue.push(message.guild.id)
          await queueGuild.save().catch(e => console.log(e));
        let selectTime = 0;
        if(args[0]){
            let argsArgs = args[0].split("");
        if(argsArgs.length > 2){
            if(argsArgs[argsArgs.length - 2].toUpperCase() + argsArgs[argsArgs.length - 1].toUpperCase() == "PM"){
                    argsArgs.splice(argsArgs.length - 1, 1);
                    argsArgs.splice(argsArgs.length - 1, 1);
                    let newArgs = argsArgs.join("");
                    if(newArgs < 1 || newArgs > 12) {
                        let queueChannel = await queueVoice.findOne({
                            guildID: message.guild.id
                          });
                          queueChannel.running = false;
                          await queueChannel.save().catch(e => console.log(e));
                        return message.channel.send(`<:xcross:690880230562201610> not a valid time lol`);
                    }
                    if(newArgs == 12) newArgs -= 12;
                    selectTime = newArgs - new Date().getHours() + 12;
            } else if(argsArgs[argsArgs.length - 2].toUpperCase() + argsArgs[argsArgs.length - 1].toUpperCase() == "AM"){
                argsArgs.splice(argsArgs.length - 1, 1);
                argsArgs.splice(argsArgs.length - 1, 1);
                let newArgs = argsArgs.join("");
                if(newArgs < 1 || newArgs > 12) {
                    let queueChannel = await queueVoice.findOne({
                        guildID: message.guild.id
                      });
                      queueChannel.running = false;
                      await queueChannel.save().catch(e => console.log(e));
                    return message.channel.send(`<:xcross:690880230562201610> not a valid time lol`);
                }
                if(newArgs == 12) newArgs = 12 + parseInt(newArgs);
                selectTime = newArgs - new Date().getHours();
            } else {
                let queueChannel = await queueVoice.findOne({
                    guildID: message.guild.id
                  });
                  queueChannel.running = false;
                  await queueChannel.save().catch(e => console.log(e));
                return message.channel.send(`<:xcross:690880230562201610> not a valid time lol`);
            }
        } else if(args[0] > 0 && args[0] < 25) {
            selectTime = args[0] - new Date().getHours();
        } else {
            let queueChannel = await queueVoice.findOne({
                guildID: message.guild.id
              });
              queueChannel.running = false;
              await queueChannel.save().catch(e => console.log(e));
            return message.channel.send(`<:xcross:690880230562201610> not a valid time lol`);
        }
        }
        let stop = false;
        let connection = await message.member.voice.channel.join().catch(e => {
            message.channel.send(`<:xcross:690880230562201610> Couldn't connect to voice channel!`)
            stop = true;
        })
        if(!stop){
        let queueChannel = await queueVoice.findOne({
            guildID: message.guild.id
          });
        if(!queueChannel) {
            return message.channel.send(`Error! Please rerun this command!`)
        } else {
            if(args[0]) queueChannel.timezone = selectTime;
            queueChannel.songType = "Animal Crossing **City Folk**";
            queueChannel.voiceID = message.member.voice.channel.id;
            queueChannel.running = false;
        }
        let time;
        if(selectTime != 0){
            time = new Date().getHours() + +selectTime;
          } else {
            time = new Date().getHours();
          }
          if(time < 13){
            if(time < 0){
              time = parseInt(time) + 12;
              if(time == 12) {
                time += "AM";
              } else {
                time += "PM";
              }
            } else {
            if(time == 12) {
              time += "PM";
            } else if(time == 0) {
              time = "AM";
            } else {
              time += "12AM";
            }
          }
        } else {
            time = time - 12;
            if(time > 12){
              time = time - 12;
            if(time == 12) {
              time += "PM";
            } else {
              time += "AM";
            }
          } else {
          if(time == 12) {
            time += "AM";
          } else {
            time += "PM";
          }
        }
        }
        const dispatcher = await connection.play(`../music/ACCF/${time}.mp3`)
        console.log(`../music/ACCF/${time}.mp3`)
        dispatcher.on("end",function(){
            connection.disconnect();
        });
        dispatcher.on('error', error => {
            console.log(error)
        });
        await queueChannel.save().catch(e => console.log(e));
        message.channel.send(`<:tickGreen:690880245611626597> playing Animal Crossing **City Folk**!`);
      } else {
        let queueChannel = await queueVoice.findOne({
            guildID: message.guild.id
          });
          queueChannel.running = false;
          await queueChannel.save().catch(e => console.log(e));
      }
    } else return message.channel.send('<:xcross:690880230562201610> You need to join a voice channel first!');
}
module.exports.config = {
    name: "accf",
    description: "Changes the queue to the 24h playlist of Animal Crossing City Folk.\nYou can also add the time of the day you want to play by stating the time of your choice (This will also automatically set the timezone to the time stated).",
    accessableby: "Everyone",
    usage: "accf <timezone>",
    aliases: ["cf", "cityfolk"]
}