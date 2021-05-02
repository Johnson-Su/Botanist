// fun funny joke jokes

const { Role } = require("discord.js");

module.exports = {
    name: 'joke',
    description: "-joke (tells a random joke)",
    execute(client, message, args){
        const jokes = ["What's big brown and sticky?", "Why couldn't the bike stand up?","What did the person say to the stone?"];
        const ans = ["A stick.", "Because it was two tired!","You rock!"];
        const whichone = Math.floor(Math.random() * 3);
        message.channel.send(jokes[whichone]);
        setTimeout(() => {  message.channel.send('...'); }, 500);
        setTimeout(() => {  message.channel.send('...'); }, 1500);
        setTimeout(() => {  message.channel.send('...'); }, 2500);
        setTimeout(() => {  message.channel.send(ans[whichone]); }, 3500);
    }
}