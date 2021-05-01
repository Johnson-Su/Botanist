const Discord = require('discord.js');
const fs = require('fs');
const language = require('@google-cloud/language');
// const admin = require('firebase-admin');
// var serviceAccount = require("./service_account.json");

const client = new Discord.Client();
const nlp_client = new language.LanguageServiceClient();

// var refreshToken = 'AIzaSyCwR7ySw5QkY6r1zpFhaF3VJhAJD0yuLR4'; // Get refresh token from OAuth2 flow
// const functions = require('firebase-functions');
// admin.initializeApp(functions.config().firebase);

// const db = admin.firestore();

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
        message.channel.send("repeat: " + text); // testing
        // NLP entity analysis
        const document = {
            content: text,
            type: 'PLAIN_TEXT',
        };

        // Detects entities in the document
        const [result] = await nlp_client.analyzeEntities({document});
        const entities = result.entities;
        // var array_len = entities.length;
        // console.log(entities[0]);
        // async function addToFirebase(){
        //     const res = await db.collection('Request').doc('Length').set(entities[0]);
        //     console.log(res);
        // }
        // addToFirebase();

        message.channel.send('Entities:');
        entities.forEach(entity => {
            if(entity.name.toLowerCase() !== "bot"){
                message.channel.send(entity.name);
                message.channel.send(` - Type: ${entity.type}, Salience: ${entity.salience}`);
                if (entity.metadata && entity.metadata.wikipedia_url) {
                    message.channel.send(` - Wikipedia URL: ${entity.metadata.wikipedia_url}`);
                }
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

    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    } 
});

var token = require('./token.js');
BOT_TOKEN = token.BOT_TOKEN;
client.login(BOT_TOKEN);


