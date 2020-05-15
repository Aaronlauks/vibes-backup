const ytdl = require('ytdl-core');
let play = true;
let ACCF = [
    'https://www.youtube.com/watch?v=Wk8VzWlnpFk',//1AM
    'https://www.youtube.com/watch?v=Wk8VzWlnpFk',
    'https://www.youtube.com/watch?v=9DwrEx-69PM',//2AM
    'https://www.youtube.com/watch?v=9DwrEx-69PM',
    'https://www.youtube.com/watch?v=lSqkG3QEsRw',//3AM
    'https://www.youtube.com/watch?v=lSqkG3QEsRw',
    'https://www.youtube.com/watch?v=jSUBf13bKOU',//4AM
    'https://www.youtube.com/watch?v=jSUBf13bKOU',
    'https://www.youtube.com/watch?v=VBOBHSdoHL8',//5AM
    'https://www.youtube.com/watch?v=VBOBHSdoHL8',
    'https://www.youtube.com/watch?v=z2QAAJeHF2s',//6AM
    'https://www.youtube.com/watch?v=z2QAAJeHF2s',
    'https://www.youtube.com/watch?v=cQ2UTZ-S9Q8',//7AM
    'https://www.youtube.com/watch?v=cQ2UTZ-S9Q8',
    'https://www.youtube.com/watch?v=C7X6BLiB2Ec',//8AM
    'https://www.youtube.com/watch?v=C7X6BLiB2Ec',
    'https://www.youtube.com/watch?v=3UpdJMSAP10',//9AM
    'https://www.youtube.com/watch?v=3UpdJMSAP10',
    'https://www.youtube.com/watch?v=CYk1CtYzz0o',//10AM
    'https://www.youtube.com/watch?v=CYk1CtYzz0o',
    'https://www.youtube.com/watch?v=FTpvuY4Y1AE',//11AM
    'https://www.youtube.com/watch?v=FTpvuY4Y1AE',
    'https://www.youtube.com/watch?v=VhzGugcr_aQ',//12PM
    'https://www.youtube.com/watch?v=VhzGugcr_aQ',
    'https://www.youtube.com/watch?v=bwgTYUKH-aA',//1PM
    'https://www.youtube.com/watch?v=bwgTYUKH-aA',
    'https://www.youtube.com/watch?v=EzNgk8hy4x8',//2PM
    'https://www.youtube.com/watch?v=EzNgk8hy4x8',
    'https://www.youtube.com/watch?v=1Oya4xMfRfw',//3PM
    'https://www.youtube.com/watch?v=1Oya4xMfRfw',
    'https://www.youtube.com/watch?v=K6KkeYwAFHE',//4PM
    'https://www.youtube.com/watch?v=K6KkeYwAFHE',
    'https://www.youtube.com/watch?v=syxR6VzzAqQ',//5PM
    'https://www.youtube.com/watch?v=syxR6VzzAqQ',
    'https://www.youtube.com/watch?v=yx_BIFCFpaA',//6PM
    'https://www.youtube.com/watch?v=yx_BIFCFpaA',
    'https://www.youtube.com/watch?v=eGl1CzBxtRQ',//7PM
    'https://www.youtube.com/watch?v=eGl1CzBxtRQ',
    'https://www.youtube.com/watch?v=qlIOtoBFmk8',//8PM
    'https://www.youtube.com/watch?v=qlIOtoBFmk8',
    'https://www.youtube.com/watch?v=Riz2ON11Vso',//9PM
    'https://www.youtube.com/watch?v=Riz2ON11Vso',
    'https://www.youtube.com/watch?v=lOdQfelEVaY',//10PM
    'https://www.youtube.com/watch?v=lOdQfelEVaY',
    'https://www.youtube.com/watch?v=ouBKNNeGbh8',//11PM
    'https://www.youtube.com/watch?v=ouBKNNeGbh8',
    'https://www.youtube.com/watch?v=G3IzATmzA3o',//12PM
    'https://www.youtube.com/watch?v=G3IzATmzA3o'
]

exports.run = async (bot, message, args, recent) => {
    if (message.member.voice.channel) {
        let connection = await message.member.voice.channel.join()
        if(!recent.has(message.guild.id)) {
            recent.set(message.guild.id, new Array());
            recent.get(message.guild.id).push(1);
            recent.get(message.guild.id).push(0);
        }
        message.channel.send(`<:tickGreen:690880245611626597> playing Animal Crossing City Folk!`)
        if(!args[0]) {
            message.channel.send(`\n**Tip:** Enter the hour of your timezone to sync with the Animal Crossing music! \`e.g. 2PM = !join 14\` (default timezone is US)`);
            recent.get(message.guild.id)[1] = 0;
        } else {
            let selectTime;
            if(args[0] > 0 && args[0] < 24) {
                selectTime = args[0] - new Date().getHours();
                recent.get(message.guild.id)[1] = selectTime;
            } else recent.get(message.guild.id)[1] = 0;
        }
        
        if(new Date().getMinutes > 29){
            recent.get(message.guild.id)[0] = (new Date().getHours() + recent.get(message.guild.id)[1]) * 2;
        } else recent.get(message.guild.id)[0] = ((new Date().getHours() + recent.get(message.guild.id)[1]) * 2) - 1;
        console.log(recent.get(message.guild.id)[0], ACCF[recent.get(message.guild.id)[0] - 1], ytdl.validateURL(ACCF[recent.get(message.guild.id)[0] - 1]))
        let dispatcher = await connection.play(ytdl(ACCF[recent.get(message.guild.id)[0] - 1]));
                dispatcher.on("end", end => {
                    console.log('song end')
                });
        var interval = setInterval (async function () {
            if(new Date().getSeconds() == 0 && new Date().getMinutes() == 0 && play == true){
                play = false;
                console.log(recent.get(message.guild.id)[0], ACCF[recent.get(message.guild.id)[0]], ytdl.validateURL(ACCF[recent.get(message.guild.id)[0]]))
                let dispatcher = await connection.play(ytdl(ACCF[recent.get(message.guild.id)[0]]));
                dispatcher.on("end", end => {
                    console.log('song end')
                });
                recent.get(message.guild.id)[0]++;
                if(recent.get(message.guild.id)[0] > 48) recent.get(message.guild.id)[0] = 1;
            } else if(new Date().getSeconds() == 0 && new Date().getMinutes() == 30 && play == false){
                play = true;
                console.log(recent.get(message.guild.id)[0], ACCF[recent.get(message.guild.id)[0]], ytdl.validateURL(ACCF[recent.get(message.guild.id)[0]]))
                let dispatcher = await connection.play(ytdl(ACCF[recent.get(message.guild.id)[0]]));
                dispatcher.on("end", end => {
                    console.log('song end')
                });
                recent.get(message.guild.id)[0]++;
                if(recent.get(message.guild.id)[0] > 48) recent.get(message.guild.id)[0] = 1;
            } else {
                //console.log(new Date().getSeconds())
            }
        });
      } else return message.channel.send('<:xcross:690880230562201610> You need to join a voice channel first!');
}
module.exports.config = {
    name: "join",
    description: "Join VC",
    accessableby: "Everyone",
    aliases: ["enter", "play", "resume"]
}