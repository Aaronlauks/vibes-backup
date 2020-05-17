var discord = require('discord.js');
var bot = new discord.Client();
const fs = require('fs');
const config = require("./config.json");
const mongoose = require('mongoose');
mongoose.connect(config.mongodb, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

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
      command = bot.commands.get("queueRefresh");
            command.run(bot);
});

bot.on('message', async message => {

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