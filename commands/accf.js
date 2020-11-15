const ytdl = require('ytdl-core');
const queueVoice = require('../models/queueChannel.js');
let ACCF = [
    'https://www.youtube.com/watch?v=Wk8VzWlnpFk',//1AM    0
    'https://www.youtube.com/watch?v=Wk8VzWlnpFk',//       1
    'https://youtu.be/rLQAe-QlfNM',//2AM    2
    'https://youtu.be/rLQAe-QlfNM', //      3
    'https://youtu.be/QOfR5ErVVfk',//3AM    4
    'https://youtu.be/QOfR5ErVVfk',//       5
    'https://youtu.be/kqxXXyaaPkM',//4AM    6
    'https://youtu.be/kqxXXyaaPkM',//       7
    'https://youtu.be/N5XPPG5Yx08',//5AM    8
    'https://youtu.be/N5XPPG5Yx08',//       9
    'https://youtu.be/tsUYdUM-xWk',//6AM    10
    'https://youtu.be/tsUYdUM-xWk',//       11
    'https://youtu.be/2UUHR8Ux1LA',//7AM    12
    'https://youtu.be/2UUHR8Ux1LA',//       13
    'https://youtu.be/GLmLsWWiOJo',//8AM    14
    'https://youtu.be/GLmLsWWiOJo',//       15
    'https://youtu.be/9Jdmc6nts5Q',//9AM    16
    'https://youtu.be/9Jdmc6nts5Q',//       17
    'https://youtu.be/au8PU_DXS7g',//10AM   18
    'https://youtu.be/au8PU_DXS7g',//       19
    'https://youtu.be/FnQ8Hiywx1M',//11AM   20
    'https://youtu.be/FnQ8Hiywx1M',//       21
    'https://youtu.be/U-haQzYCgCg',//12PM   22
    'https://youtu.be/U-haQzYCgCg',//       23
    'https://youtu.be/FYTDoxXHq4w',//1PM    24
    'https://youtu.be/FYTDoxXHq4w',//       25
    'https://youtu.be/sC_V7tSIp8A',//2PM    26
    'https://youtu.be/sC_V7tSIp8A',//       27
    'https://youtu.be/IEahwOr_sNg',//3PM    28
    'https://youtu.be/IEahwOr_sNg',//       29
    'https://youtu.be/xErAHybseiM',//4PM    30
    'https://youtu.be/xErAHybseiM',//       31
    'https://youtu.be/PVXfCqRXQZU',//5PM    32
    'https://youtu.be/PVXfCqRXQZU',//       33
    'https://youtu.be/z8lkmysGeHg',//6PM    34
    'https://youtu.be/z8lkmysGeHg',//       35
    'https://youtu.be/IDoCh0vBiqI',//7PM    36
    'https://youtu.be/IDoCh0vBiqI',//       37
    'https://youtu.be/B01Xfk97oaY',//8PM    38
    'https://youtu.be/B01Xfk97oaY',//       39
    'https://youtu.be/cNmFfpu-_CU',//9PM    40
    'https://youtu.be/cNmFfpu-_CU',//       41
    'https://youtu.be/d6gbCOgmnN8',//10PM   42
    'https://youtu.be/d6gbCOgmnN8',//       43
    'https://youtu.be/WoWf9rHlRd8',//11PM   44
    'https://youtu.be/WoWf9rHlRd8',//       45
    'https://youtu.be/hqeB7t_Bx_4',//12AM   46
    'https://youtu.be/hqeB7t_Bx_4'//        47
]

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
        if(selectTime < -9) selectTime = 24 - selectTime;
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
            if(args[0]) queueChannel.songNum = selectTime;
            queueChannel.songType = "Animal Crossing **City Folk**";
            queueChannel.queue = ACCF;
            queueChannel.voiceID = message.member.voice.channel.id;
            queueChannel.running = false;
        }
        message.channel.send(`<:tickGreen:690880245611626597> playing Animal Crossing **City Folk**!`);
        let songNum
        if(queueChannel.songNum != 0){
            let buffer = 0;
            if(new Date().getHours() + +queueChannel.songNum > 24) buffer = -24;
            if(new Date().getHours() + +queueChannel.songNum < 1) buffer = +24;
        if(new Date().getMinutes() > 29){
            songNum = ((new Date().getHours() + +queueChannel.songNum + buffer) * 2) - 1;
            queueChannel.play = true;
        } else {
            songNum = ((new Date().getHours() + +queueChannel.songNum + buffer) * 2) - 2;
            queueChannel.play = false;
        } 
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
        console.log(music)
        const dispatcher = await connection.play(ytdl(music))
        dispatcher.on("end",function(){
            connection.disconnect();
        });
        dispatcher.on('error', error => {
            console.log(error)
        });
        await queueChannel.save().catch(e => console.log(e));
                
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