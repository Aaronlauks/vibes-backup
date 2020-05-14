const ytdl = require('ytdl-core');
play = true;
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
let songNum = 1;

exports.run = async (bot, message, args, ops) => {
    if (message.member.voice.channel) {
        let connection = await message.member.voice.channel.join()
        message.channel.send(`<:tickGreen:690880245611626597> playing Animal Crossing City Folk!`)
        if(new Date().getMinutes > 30){
            songNum = new Date().getHours * 2;
        } else songNum = new Date().getHours * 2 - 1;
        console.log(ytdl.validateURL(ACCF[songNum - 1]))
        let dispatcher = await connection.play(ytdl(ACCF[songNum - 1]));
                dispatcher.on("end", end => {
                    console.log('song end')
                });
        var interval = setInterval (async function () {
            if(new Date().getSeconds() == 0 && new Date().getMinutes() == 0 && play == true){
                play = false;
                let dispatcher = await connection.playStream(ytdl(ACCF[songNum]));
                dispatcher.on("end", end => {
                    console.log('song end')
                });
                songNum++;
                if(songNum > 24) songNum = 1;
            } else if(new Date().getSeconds() == 0 && new Date().getMinutes() == 30 && play == false){
                play = true;
                let dispatcher = await connection.playStream(ytdl(ACCF[songNum]));
                dispatcher.on("end", end => {
                    console.log('song end')
                });
                songNum++;
                if(songNum > 24) songNum = 1;
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