const ytdl = require('ytdl-core');
const queueVoice = require('../models/queueChannel.js');
let ACCF = [
    'https://www.youtube.com/watch?v=Wk8VzWlnpFk',//1AM    0
    'https://www.youtube.com/watch?v=Wk8VzWlnpFk',//       1
    'https://www.youtube.com/watch?v=9DwrEx-69PM',//2AM    2
    'https://www.youtube.com/watch?v=9DwrEx-69PM', //      3
    'https://www.youtube.com/watch?v=lSqkG3QEsRw',//3AM    4
    'https://www.youtube.com/watch?v=lSqkG3QEsRw',//       5
    'https://www.youtube.com/watch?v=jSUBf13bKOU',//4AM    6
    'https://www.youtube.com/watch?v=jSUBf13bKOU',//       7
    'https://www.youtube.com/watch?v=VBOBHSdoHL8',//5AM    8
    'https://www.youtube.com/watch?v=VBOBHSdoHL8',//       9
    'https://www.youtube.com/watch?v=z2QAAJeHF2s',//6AM    10
    'https://www.youtube.com/watch?v=z2QAAJeHF2s',//       11
    'https://www.youtube.com/watch?v=cQ2UTZ-S9Q8',//7AM    12
    'https://www.youtube.com/watch?v=cQ2UTZ-S9Q8',//       13
    'https://www.youtube.com/watch?v=C7X6BLiB2Ec',//8AM    14
    'https://www.youtube.com/watch?v=C7X6BLiB2Ec',//       15
    'https://www.youtube.com/watch?v=3UpdJMSAP10',//9AM    16
    'https://www.youtube.com/watch?v=3UpdJMSAP10',//       17
    'https://www.youtube.com/watch?v=CYk1CtYzz0o',//10AM   18
    'https://www.youtube.com/watch?v=CYk1CtYzz0o',//       19
    'https://www.youtube.com/watch?v=FTpvuY4Y1AE',//11AM   20
    'https://www.youtube.com/watch?v=FTpvuY4Y1AE',//       21
    'https://www.youtube.com/watch?v=VhzGugcr_aQ',//12PM   22
    'https://www.youtube.com/watch?v=VhzGugcr_aQ',//       23
    'https://www.youtube.com/watch?v=bwgTYUKH-aA',//1PM    24
    'https://www.youtube.com/watch?v=bwgTYUKH-aA',//       25
    'https://www.youtube.com/watch?v=EzNgk8hy4x8',//2PM    26
    'https://www.youtube.com/watch?v=EzNgk8hy4x8',//       27
    'https://www.youtube.com/watch?v=1Oya4xMfRfw',//3PM    28
    'https://www.youtube.com/watch?v=1Oya4xMfRfw',//       29
    'https://www.youtube.com/watch?v=K6KkeYwAFHE',//4PM    30
    'https://www.youtube.com/watch?v=K6KkeYwAFHE',//       31
    'https://www.youtube.com/watch?v=syxR6VzzAqQ',//5PM    32
    'https://www.youtube.com/watch?v=syxR6VzzAqQ',//       33
    'https://www.youtube.com/watch?v=yx_BIFCFpaA',//6PM    34
    'https://www.youtube.com/watch?v=yx_BIFCFpaA',//       35
    'https://www.youtube.com/watch?v=eGl1CzBxtRQ',//7PM    36
    'https://www.youtube.com/watch?v=eGl1CzBxtRQ',//       37
    'https://www.youtube.com/watch?v=qlIOtoBFmk8',//8PM    38
    'https://www.youtube.com/watch?v=qlIOtoBFmk8',//       39
    'https://www.youtube.com/watch?v=Riz2ON11Vso',//9PM    40
    'https://www.youtube.com/watch?v=Riz2ON11Vso',//       41
    'https://www.youtube.com/watch?v=lOdQfelEVaY',//10PM   42
    'https://www.youtube.com/watch?v=lOdQfelEVaY',//       43
    'https://www.youtube.com/watch?v=ouBKNNeGbh8',//11PM   44
    'https://www.youtube.com/watch?v=ouBKNNeGbh8',//       45
    'https://www.youtube.com/watch?v=G3IzATmzA3o',//12AM   46
    'https://www.youtube.com/watch?v=G3IzATmzA3o'//        47
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
                    if(newArgs < 1 || newArgs > 12) return message.channel.send(`<:xcross:690880230562201610> not a valid time lol`);
                    if(newArgs == 12) newArgs -= 12;
                    selectTime = newArgs - new Date().getHours() + 12;
            } else if(argsArgs[argsArgs.length - 2].toUpperCase() + argsArgs[argsArgs.length - 1].toUpperCase() == "AM"){
                argsArgs.splice(argsArgs.length - 1, 1);
                argsArgs.splice(argsArgs.length - 1, 1);
                let newArgs = argsArgs.join("");
                if(newArgs < 1 || newArgs > 12) return message.channel.send(`<:xcross:690880230562201610> not a valid time lol`);
                if(newArgs == 12) newArgs = 12 + parseInt(newArgs);
                selectTime = newArgs - new Date().getHours();
            } else return message.channel.send(`<:xcross:690880230562201610> not a valid time lol`);
        } else if(args[0] > 0 && args[0] < 25) {
            selectTime = args[0] - new Date().getHours();
        } else return message.channel.send(`<:xcross:690880230562201610> not a valid time lol`);
        }
        let connection = await message.member.voice.channel.join()
        let queueChannel = await queueVoice.findOne({
            guildID: message.guild.id
          });
        if(!queueChannel) {
            queueChannel = new queueVoice({
                guildID: message.guild.id,
                queue: ACCF,
                voiceID: message.member.voice.channel.id,
                songNum: 0,
                play: true,
                prefix: "!"
            });
        } else {
            if(args[0]) queueChannel.songNum = selectTime;
            queueChannel.queue = ACCF;
            queueChannel.voiceID = message.member.voice.channel.id;
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
        console.log(queueChannel.songNum, songNum, new Date().getMinutes(), new Date().getSeconds())
        let music = queueChannel.queue[songNum];
        await connection.play(ytdl(music));
        await queueChannel.save().catch(e => console.log(e));
                
      } else return message.channel.send('<:xcross:690880230562201610> You need to join a voice channel first!');
}
module.exports.config = {
    name: "accf",
    description: "Changes the queue to the 24h playlist of Animal Crossing City Folk.\nYou can also add the time of the day you want to play by stating the time of your choice (This will also automatically set the timezone to the time stated).",
    accessableby: "Everyone",
    usage: "accf <timezone>",
    aliases: ["cf", "cityfolk"]
}