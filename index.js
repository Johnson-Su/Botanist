const Discord = require('discord.js');
const fs = require('fs');
const language = require('@google-cloud/language');
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
const {Storage} = require('@google-cloud/storage');
global.XMLHttpRequest = require("xhr2");

const client = new Discord.Client();
const nlp_client = new language.LanguageServiceClient();
const storage = new Storage();s

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


client.on('message', message =>{
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
        var commands = ['grow', 'graft', 'help', 'modules', 'bot'];
        message.channel.send('Entities:');
        entities.forEach(entity => {
            if(!commands.includes(entity.name.toLowerCase())){
                message.channel.send(entity.name);
                message.channel.send(` - Type: ${entity.type}, Salience: ${entity.salience}`);

                async function addToFirebase(){
                    const res = await db.ref('Request').push({
                        entity: entity.name,
                        salience: entity.salience
                      });
                    // console.log(res);
                }
                addToFirebase();
            } 
            // else{
            //     array_len = array_len - 1;
            // }
        });
    }
    const text = message.content;
    getEntities(text);

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'grow'){
        client.commands.get('grow').execute(client, message, db);
    } else if(command === 'help'){
        client.commands.get('help').execute(message, args);
    } else if(command === 'modules'){
        client.commands.get('modules').execute(message, args);
    } else if(command === 'graft'){
        client.commands.get('graft').execute(message, args);
    } else if(command === 'plant'){
        client.commands.get('plant').execute(client, message, db);
    } else if(command === 'harvest'){
        client.commands.get('harvest').execute(client, message, db);
    }
});

var token = require('./token.js');
BOT_TOKEN = token.BOT_TOKEN;
client.login(BOT_TOKEN);


