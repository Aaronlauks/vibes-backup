var discord = require('discord.js');
var bot = new discord.Client();
const ytdl = require('ytdl-core');
const fs = require('fs');
const config = require("./config.json");
const mongoose = require('mongoose');
let startPlay = true;
mongoose.connect(config.mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const queueVoice = require('./models/queueChannel.js');

bot.aliases = new discord.Collection();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {
  let jsfile = files.filter(f => f.split(".").pop() === "js")
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    bot.commands.set(props.config.name, props);
    props.config.aliases.forEach(aliases => {
      bot.aliases.set(aliases, props.config.name);
    });
  });
});

bot.on("ready", async () => {
    console.log(`Logged in as ${bot.user.tag}`);
    bot.user.setActivity('Animal Crossing :)', {
        type: "STREAMING",
        url: "https://www.twitch.tv/AaronBotDiscord"
      });
});

bot.on('message', async message => {

  setInterval (async function () {
    if(new Date().getMinutes() == 15) startPlay = true;
    if(new Date().getSeconds() == 0){
    let queueGuild = await queueVoice.findOne({
      ID: "42069"
    });
    if(queueGuild){
    queueGuild.queue.forEach(async guildID => {
      let queueChannel = await queueVoice.findOne({
        guildID: guildID
      });
      if(queueChannel){
        if(startPlay){
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
    } else {
        //console.log(new Date().getSeconds())
    }
  }
  } else {
    queueGuild.queue.splice(queueGuild.queue.indexOf(guildID), 1);
    await queueGuild.save().catch(e => console.log(e));
  }
    });
  }
}
})

    let prefix = config.prefix;
    if (!message.content.toLowerCase().startsWith(prefix)) return;

    let sender = message.author;
    let args = message.content.slice(prefix.length).trim().split(/ +/g); //args is the inputs after the cmd(a$say | test: |,test)
    let cmd = args.shift().toLowerCase(); //cmd is the command name (a help: help)
    let command;
    if (sender.bot) return;
    try {
      if(bot.commands.has(cmd)){
        command = bot.commands.get(cmd);
      } else {
        command = bot.commands.get(bot.aliases.get(cmd));
      }
      command.run(bot, message, args);
    } catch (e) {
      console.log(`${cmd} is not a command`);
    } finally {
      console.log(`${message.author.username} ran the command: ${cmd}`);
    }
});


bot.login(process.env.BOT_TOKEN);