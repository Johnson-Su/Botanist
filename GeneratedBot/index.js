const Discord = require('discord.js');
const fs = require('fs');
global.XMLHttpRequest = require("xhr2");
var auth = require('./auth.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const prefix = '-';

const commandFiles = fs.readdirSync('./modules/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./modules/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log(auth.BOT_NAME + ' is online!');
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(client, message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

BOT_TOKEN = auth.BOT_TOKEN;
client.login(BOT_TOKEN);