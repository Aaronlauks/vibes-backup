const ytdl = require('ytdl-core');
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

exports.run = async (bot, message, args, recent) => {
    if (message.member.voice.channel) {
        let connection = await message.member.voice.channel.join()
        if(!recent.has(message.guild.id)) {
            recent.set(message.guild.id, ACCF);
            recent.get(message.guild.id).push(1);
            recent.get(message.guild.id).push(0);
            recent.get(message.guild.id).push(true);
        }
        message.channel.send(`<:tickGreen:690880245611626597> playing Animal Crossing City Folk!`)
        if(!args[0]) {
            message.channel.send(`_ _\n**Tip:** Enter the hour from __0-24__ of your timezone to sync with the Animal Crossing music! \`e.g. 2PM = !accf 14\` (default timezone is US)`);
            recent.get(message.guild.id)[49] = 0;
        } else {
            let selectTime;
            if(args[0] > 0 && args[0] < 25) {
                selectTime = args[0] - new Date().getHours();
                recent.get(message.guild.id)[49] = selectTime;
            } else recent.get(message.guild.id)[49] = 0;
        }
        
        if(new Date().getMinutes > 29){
            recent.get(message.guild.id)[48] = ((new Date().getHours() + recent.get(message.guild.id)[49]) * 2) - 1;
            console.log(`30min+`)
            recent.get(message.guild.id)[50] = true;
        } else {
            recent.get(message.guild.id)[48] = ((new Date().getHours() + recent.get(message.guild.id)[49]) * 2) - 2;
            console.log(`less than 30min`)
            recent.get(message.guild.id)[50] = false;
        } 
        console.log(recent.get(message.guild.id)[48], recent.get(message.guild.id)[recent.get(message.guild.id)[48]])
        let music = recent.get(message.guild.id)[recent.get(message.guild.id)[48]];
        let dispatcher = await connection.play(ytdl(music));
                dispatcher.on("end", end => {
                    console.log('song end')
                });
                recent.get(message.guild.id)[48]++;
        var interval = setInterval (async function () {
            if(new Date().getSeconds() == 0 && new Date().getMinutes() == 0 && recent.get(message.guild.id)[50] == true){
                recent.get(message.guild.id)[50] = false;
                console.log(recent.get(message.guild.id)[48], recent.get(message.guild.id)[recent.get(message.guild.id)[48]])
                music = recent.get(message.guild.id)[recent.get(message.guild.id)[48]];
                let dispatcher = await connection.play(ytdl(music));
                dispatcher.on("end", end => {
                    console.log('song end')
                });  
                recent.get(message.guild.id)[48]++;
                if(recent.get(message.guild.id)[48] > 47) recent.get(message.guild.id)[48] = 0;
            } else if(new Date().getSeconds() == 0 && new Date().getMinutes() == 30 && !recent.get(message.guild.id)[50]){
                recent.get(message.guild.id)[50] = true;
                console.log(recent.get(message.guild.id)[48], recent.get(message.guild.id)[recent.get(message.guild.id)[48]])
                music = recent.get(message.guild.id)[recent.get(message.guild.id)[48]];
                let dispatcher = await connection.play(ytdl(music));
                dispatcher.on("end", end => {
                    console.log('song end')
                });
                recent.get(message.guild.id)[48]++;
                if(recent.get(message.guild.id)[48] > 47) recent.get(message.guild.id)[48] = 0;
            } else {
                //console.log(new Date().getSeconds())
            }
        });
      } else return message.channel.send('<:xcross:690880230562201610> You need to join a voice channel first!');
}
module.exports.config = {
    name: "accf",
    description: "Join VC",
    accessableby: "Everyone",
    aliases: ["cf", "cityfolk"]
}