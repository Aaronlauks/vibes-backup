const ytdl = require('ytdl-core');
const queueVoice = require('../models/queueChannel.js');
let ACNH = [
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
        let selectTime;
        let connection = await message.member.voice.channel.join()
        let queueChannel = await queueVoice.findOne({
            guildID: message.guild.id
          });
        if(!queueChannel) {
            queueChannel = new queueVoice({
                guildID: message.guild.id,
                queue: ACNH,
                voiceID: message.member.voice.channel.id,
                songNum: 1,
                play: true
            });
        } else {
            queueChannel.queue = ACNH;
            queueChannel.voiceID = message.member.voice.channel.id;
        }
        message.channel.send(`<:tickGreen:690880245611626597> playing Animal Crossing New Horizon!`)
        if(!args[0]) {
            message.channel.send(`_ _\n**Tip:** Enter the hour from __0-24__ of your timezone to sync with the Animal Crossing music! \`e.g. 2PM = !acnh 14, 5AM = !acnl 5am\` (default timezone is US)`);
            selectTime = 0;
        } else {
            let argsArgs = args[0].split("");
            if(argsArgs.length > 2){
                if(argsArgs[argsArgs.length - 2].toUpperCase() + argsArgs[argsArgs.length - 1].toUpperCase() == "PM"){
                        argsArgs.splice(argsArgs.length - 1, 1);
                        argsArgs.splice(argsArgs.length - 1, 1);
                        let newArgs = argsArgs.join("");
                        if(newArgs < 1 || newArgs > 12) return message.channel.send(`<:xcross:690880230562201610> not a valid time lol`);
                        selectTime = newArgs - new Date().getHours() + 12;
                } else if(argsArgs[argsArgs.length - 2].toUpperCase() + argsArgs[argsArgs.length - 1].toUpperCase() == "AM"){
                    argsArgs.splice(argsArgs.length - 1, 1);
                    argsArgs.splice(argsArgs.length - 1, 1);
                    let newArgs = argsArgs.join("");
                    if(newArgs < 1 || newArgs > 12) return message.channel.send(`<:xcross:690880230562201610> not a valid time lol`);
                    selectTime = newArgs - new Date().getHours();
                } else return message.channel.send(`<:xcross:690880230562201610> not a valid time lol`);
            } else if(args[0] > 0 && args[0] < 25) {
                selectTime = args[0] - new Date().getHours();
            } else selectTime = 0;
        }
        if(new Date().getMinutes() > 29){
            queueChannel.songNum = ((new Date().getHours() + selectTime) * 2) - 1;
            queueChannel.play = true;
        } else {
            queueChannel.songNum = ((new Date().getHours() + selectTime) * 2) - 2;
            queueChannel.play = false;
        } 
        console.log(queueChannel.songNum, new Date().getMinutes(), new Date().getSeconds())
        let music = queueChannel.queue[queueChannel.songNum];
        let dispatcher = await connection.play(ytdl(music));
                dispatcher.on("end", end => {
                    console.log('song end')
                });
                queueChannel.songNum++;
                await queueChannel.save().catch(e => console.log(e));
      } else return message.channel.send('<:xcross:690880230562201610> You need to join a voice channel first!');
}
module.exports.config = {
    name: "acnh",
    description: "Join VC",
    accessableby: "Everyone",
    aliases: ["nh", "newhorizon"]
}