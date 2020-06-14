const ytdl = require('ytdl-core');
const queueVoice = require('../models/queueChannel.js');
let ACCF = [
    'https://www.youtube.com/watch?v=-tcbrfqvu4Q',//1AM    0
    'https://www.youtube.com/watch?v=-tcbrfqvu4Q',//       1
    'https://www.youtube.com/watch?v=HKmobfpFraA',//2AM    2
    'https://www.youtube.com/watch?v=HKmobfpFraA', //      3
    'https://www.youtube.com/watch?v=4QWdEp3qkao',//3AM    4
    'https://www.youtube.com/watch?v=4QWdEp3qkao',//       5
    'https://www.youtube.com/watch?v=JWo2EihpEo0',//4AM    6
    'https://www.youtube.com/watch?v=JWo2EihpEo0',//       7
    'https://www.youtube.com/watch?v=_EqqsvOCils',//5AM    8
    'https://www.youtube.com/watch?v=_EqqsvOCils',//       9
    'https://www.youtube.com/watch?v=IMvSt6wXmd4',//6AM    10
    'https://www.youtube.com/watch?v=IMvSt6wXmd4',//       11
    'https://www.youtube.com/watch?v=1-skezuMbH4',//7AM    12
    'https://www.youtube.com/watch?v=1-skezuMbH4',//       13
    'https://www.youtube.com/watch?v=4n_CXY5M2bo',//8AM    14
    'https://www.youtube.com/watch?v=4n_CXY5M2bo',//       15
    'https://www.youtube.com/watch?v=jOoinpKuIMg',//9AM    16
    'https://www.youtube.com/watch?v=jOoinpKuIMg',//       17
    'https://www.youtube.com/watch?v=DbzXqrdoIVs',//10AM   18
    'https://www.youtube.com/watch?v=DbzXqrdoIVs',//       19
    'https://www.youtube.com/watch?v=S2cfXCjD5Bo',//11AM   20
    'https://www.youtube.com/watch?v=S2cfXCjD5Bo',//       21
    'https://www.youtube.com/watch?v=Wpy5GveSgt4',//12PM   22
    'https://www.youtube.com/watch?v=Wpy5GveSgt4',//       23
    'https://www.youtube.com/watch?v=MuWwLxLF3_o',//1PM    24
    'https://www.youtube.com/watch?v=MuWwLxLF3_o',//       25
    'https://www.youtube.com/watch?v=q8GyGnqqv3M',//2PM    26
    'https://www.youtube.com/watch?v=q8GyGnqqv3M',//       27
    'https://www.youtube.com/watch?v=GtMIbcwcORM',//3PM    28
    'https://www.youtube.com/watch?v=GtMIbcwcORM',//       29
    'https://www.youtube.com/watch?v=vyl3Cb2tQVo',//4PM    30
    'https://www.youtube.com/watch?v=vyl3Cb2tQVo',//       31
    'https://www.youtube.com/watch?v=rRvVOLUC6BQ',//5PM    32
    'https://www.youtube.com/watch?v=rRvVOLUC6BQ',//       33
    'https://www.youtube.com/watch?v=QIchIozqcw0',//6PM    34
    'https://www.youtube.com/watch?v=QIchIozqcw0',//       35
    'https://www.youtube.com/watch?v=m1bfNsCN7XU',//7PM    36
    'https://www.youtube.com/watch?v=m1bfNsCN7XU',//       37
    'https://www.youtube.com/watch?v=p2J9qOsM21s',//8PM    38
    'https://www.youtube.com/watch?v=p2J9qOsM21s',//       39
    'https://www.youtube.com/watch?v=r7aToLm-4CM',//9PM    40
    'https://www.youtube.com/watch?v=r7aToLm-4CM',//       41
    'https://www.youtube.com/watch?v=h8iLGgJ-pRY',//10PM   42
    'https://www.youtube.com/watch?v=h8iLGgJ-pRY',//       43
    'https://www.youtube.com/watch?v=jmX18LLa_gM',//11PM   44
    'https://www.youtube.com/watch?v=jmX18LLa_gM',//       45
    'https://www.youtube.com/watch?v=XrqtMWI-rmk',//12AM   46
    'https://www.youtube.com/watch?v=XrqtMWI-rmk'//        47
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
                queue: ACCF,
                voiceID: message.member.voice.channel.id,
                songNum: 1,
                play: true
            });
        } else {
            queueChannel.queue = ACCF;
            queueChannel.voiceID = message.member.voice.channel.id;
        }
        if(!args[0]) {
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
            } else return message.channel.send(`<:xcross:690880230562201610> not a valid time lol`);
        }
        message.channel.send(`<:tickGreen:690880245611626597> playing Animal Crossing **GameCube**!`)
        if(!args[0]) message.channel.send(`_ _\n**Tip:** Enter the hour of your timezone to sync with the Animal Crossing music! \`e.g. 2PM = !acgcn 14, 5AM = !acgcn 5am\` (default timezone is US)`);
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
    name: "acgcn",
    description: "Adds animal crossing gamecube to the 24h queue",
    accessableby: "Everyone",
    usage: "!acgcn <timezone>",
    aliases: ["gcn", "gamecube"]
}