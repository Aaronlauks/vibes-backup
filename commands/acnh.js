const ytdl = require('ytdl-core');
const queueVoice = require('../models/queueChannel.js');
let ACCF = [
    'https://www.youtube.com/watch?v=LJhvOKQZqC0',//1AM    0
    'https://www.youtube.com/watch?v=LJhvOKQZqC0',//       1
    'https://www.youtube.com/watch?v=bgdqH77h4qU',//2AM    2
    'https://www.youtube.com/watch?v=bgdqH77h4qU', //      3
    'https://www.youtube.com/watch?v=C1cfkkscrI8',//3AM    4
    'https://www.youtube.com/watch?v=C1cfkkscrI8',//       5
    'https://www.youtube.com/watch?v=GnLPAiLYmKw',//4AM    6
    'https://www.youtube.com/watch?v=GnLPAiLYmKw',//       7
    'https://www.youtube.com/watch?v=dJwg-mWj7xY',//5AM    8
    'https://www.youtube.com/watch?v=dJwg-mWj7xY',//       9
    'https://www.youtube.com/watch?v=FqUlCT47ucE',//6AM    10
    'https://www.youtube.com/watch?v=FqUlCT47ucE',//       11
    'https://www.youtube.com/watch?v=y6dF4h5z0ik',//7AM    12
    'https://www.youtube.com/watch?v=y6dF4h5z0ik',//       13
    'https://www.youtube.com/watch?v=YhpYzNZkg8E',//8AM    14
    'https://www.youtube.com/watch?v=YhpYzNZkg8E',//       15
    'https://www.youtube.com/watch?v=rw-NhaaC8bU',//9AM    16
    'https://www.youtube.com/watch?v=rw-NhaaC8bU',//       17
    'https://www.youtube.com/watch?v=mnC8Yj7GUBk',//10AM   18
    'https://www.youtube.com/watch?v=mnC8Yj7GUBk',//       19
    'https://www.youtube.com/watch?v=bnzSJMLDm90',//11AM   20
    'https://www.youtube.com/watch?v=bnzSJMLDm90',//       21
    'https://www.youtube.com/watch?v=FuMClV20DDg',//12PM   22
    'https://www.youtube.com/watch?v=FuMClV20DDg',//       23
    'https://www.youtube.com/watch?v=cTMHpVXBWVo',//1PM    24
    'https://www.youtube.com/watch?v=cTMHpVXBWVo',//       25
    'https://www.youtube.com/watch?v=ALRRqnJdAhc',//2PM    26
    'https://www.youtube.com/watch?v=ALRRqnJdAhc',//       27
    'https://www.youtube.com/watch?v=Lu7h28H52jM',//3PM    28
    'https://www.youtube.com/watch?v=Lu7h28H52jM',//       29
    'https://www.youtube.com/watch?v=jHs6hIDmOFE',//4PM    30
    'https://www.youtube.com/watch?v=jHs6hIDmOFE',//       31
    'https://www.youtube.com/watch?v=pJvjbosEdHE',//5PM    32
    'https://www.youtube.com/watch?v=pJvjbosEdHE',//       33
    'https://www.youtube.com/watch?v=lxgcDP-wppM',//6PM    34
    'https://www.youtube.com/watch?v=lxgcDP-wppM',//       35
    'https://www.youtube.com/watch?v=ZMgj30uGeb0',//7PM    36
    'https://www.youtube.com/watch?v=ZMgj30uGeb0',//       37
    'https://www.youtube.com/watch?v=9n-LArbDkIk',//8PM    38
    'https://www.youtube.com/watch?v=9n-LArbDkIk',//       39
    'https://www.youtube.com/watch?v=QEkytL-anQw',//9PM    40
    'https://www.youtube.com/watch?v=QEkytL-anQw',//       41
    'https://www.youtube.com/watch?v=GFBWicff5ZE',//10PM   42
    'https://www.youtube.com/watch?v=GFBWicff5ZE',//       43
    'https://www.youtube.com/watch?v=HT-djWRbNN4',//11PM   44
    'https://www.youtube.com/watch?v=HT-djWRbNN4',//       45
    'https://www.youtube.com/watch?v=lqs34Ou0Rw8',//12AM   46
    'https://www.youtube.com/watch?v=lqs34Ou0Rw8'//        47
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
            return message.channel.send(`Error! Please rerun this command!`)
        } else {
            if(args[0]) queueChannel.songNum = selectTime;
            queueChannel.songType = "Animal Crossing **New Horizon**";
            queueChannel.interval = "none"
            queueChannel.queue = ACCF;
            queueChannel.voiceID = message.member.voice.channel.id;
            queueChannel.running = false;
        }
        message.channel.send(`<:tickGreen:690880245611626597> playing Animal Crossing **New Horizon**!`);
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
    name: "acnh",
    description: "Changes the queue to the 24h playlist of Animal Crossing New Horizon.\nYou can also add the time of the day you want to play by stating the time of your choice (This will also automatically set the timezone to the time stated).",
    accessableby: "Everyone",
    usage: "acnl <time>",
    aliases: ["nh", "newhorizon"]
}