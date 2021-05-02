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

function uploadFile(attachment) {
    return new Promise(resolve => {
        const bucket = storage.bucket("botanist-312407.appspot.com");

        var data = fs.readFileSync(`./modules/${attachment.name}`, 'UTF-8');
        data = data.substr(2, data.indexOf("\n"));
        console.log(data);
        const image_options = {
            destination: `${attachment.name}`,
            metadata: {
                metadata: {
                tags: data // parse first line comment, splice whitespace
                }
            }
        }
        bucket.upload(`./modules/${attachment.name}`, image_options, function(err, file, apiResponse) {});

        const bucket_options = {
            includeFiles: true,
            force: true
        };
        bucket.makePublic(bucket_options, function(err, files) {});
        console.log('Uploaded a raw string!');
    resolve('resolved');
    });
}


function download(attachment){
    return new Promise(resolve => {
        request.get(attachment.url)
        .on('error', console.error)
        .pipe(fs.createWriteStream(`./modules/${attachment.name}`));
        resolve('resolved');
      });
}

client.on('message', message =>{
    if(message.attachments.size > 0 && !message.author.bot){
        message.channel.send(message.attachments.first().name);
        if(message.attachments.first().url.slice(-3) === `.js`){
            async function order(){
                await download(message.attachments.first());
            
                await uploadFile(message.attachments.first());
            } order();
            
        }
    }

    if(!message.content.startsWith(prefix) || message.author.bot) return;


    async function getEntities(text) {
        // NLP entity analysis
        const document = {
            content: text,
            type: 'PLAIN_TEXT',
        };

        // Detects entities in the document
        const [result] = await nlp_client.analyzeEntities({document});
        const entities = result.entities;
        // var array_len = entities.length;
        message.channel.send('Entities:');
        entities.forEach(entity => {
            message.channel.send(entity.name);
            message.channel.send(` - Type: ${entity.type}, Salience: ${entity.salience}`);

            async function addToFirebase(){
                const res = await db.ref('Request').push({
                    entity: entity.name,
                    salience: entity.salience
                    });
            }
            addToFirebase();
        });
    }
    const text = message.content;
    getEntities(text);

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const cmds = ["plant","grow","graft","harvest","help","modules", "get_starter", "ban","gamble","image","kick","roulette","joke"]
    if (cmds.includes(command)){
        client.commands.get(command).execute(client, message, args, db);
    }
});

var token = require('./token.js');
BOT_TOKEN = token.BOT_TOKEN;
client.login(BOT_TOKEN);