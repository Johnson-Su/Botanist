const Discord = require('discord.js');
const fs = require('fs');
var Scraper = require('images-scraper');
const language = require('@google-cloud/language');
const {Storage} = require('@google-cloud/storage');
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
global.XMLHttpRequest = require("xhr2");
let request = require(`request`);

const client = new Discord.Client();
const nlp_client = new language.LanguageServiceClient();
const storage = new Storage();

var config = {
    apiKey: "AIzaSyCwR7ySw5QkY6r1zpFhaF3VJhAJD0yuLR4",
    authDomain: "botanist-312407.firebaseapp.com",
    databaseURL: "https://botanist-312407-default-rtdb.firebaseio.com/",
    storageBucket: "botanist-312407.appspot.com"
};
firebase.initializeApp(config)

const db = firebase.database();


const prefix = '-';

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./modules/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./modules/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Botanist is online!');
});

async function uploadFile(attachment) {
        const bucket = storage.bucket("botanist-312407.appspot.com");

        var data = fs.readFileSync(`./modules/${attachment.name}`, 'UTF-8');
        data = data.substr(2, data.indexOf("\n"));
     
        const image_options = {
            destination: `${attachment.name}`,
            metadata: {
                metadata: {
                tags: data // parse first line comment, splice whitespace
                }
            }
        }
        
        await bucket.upload(`./modules/${attachment.name}`, image_options, function(err, file, apiResponse) {});

        const bucket_options = {
            includeFiles: true,
            force: true
        };
        bucket.makePublic(bucket_options, function(err, files) {});
        console.log('Uploaded a new module file!');
}


async function download(attachment){
        await request.get(attachment.url)
        .on('error', console.error)
        .pipe(fs.createWriteStream(`./modules/${attachment.name}`));
}

client.on('message', message =>{
    if(message.attachments.size > 0 && !message.author.bot){
        message.channel.send("Thank you for contributing " + message.attachments.first().name);
        if(message.attachments.first().url.slice(-3) === `.js`){
            async function order(){
                await download(message.attachments.first());
                setTimeout(() => { uploadFile(message.attachments.first()).catch(console.error);; }, 1500);
            } order().catch(console.error);
        }
    }

    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const cmds = ["plant","grow","graft","harvest","help","modules", "get_starter", "ban","gamble","image","kick","roulette","joke"]
    if (cmds.includes(command)){
        client.commands.get(command).execute(client, message, args, db);
    }
});

process.env.GOOGLE_APPLICATION_CREDENTIALS="./service_account.json"

var token = require('./token.js');
BOT_TOKEN = token.BOT_TOKEN;
client.login(BOT_TOKEN);