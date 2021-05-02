const { Role } = require("discord.js");

module.exports = {
    name: 'plant',
    description: "-plant (creates a new channel for growing a bot)",
    execute(client, message, db){
        //make temp channel with welcome
        message.guild.channels.create('botanist nursery', {
            type: 'text'
        }).then((channel) => {
            message.reply('Moving bot creation to botanist-nursery 🌱');
            channel.send("Welcome to the Nursery! You'll grow your own custom bot here!");
            var instructions = "```INSTRUCTIONS\nTo create a bot enter a command in the following format:\n\n-grow BOT_NAME BOT_TOKEN CLIENT_ID DESCRIPTION\n\nex// -grow ModBot 237u1293712 324732099080 I want to search images and moderate users!\n\nPS. Write your request as if you were talking to a real person! We use AI to create a bot to match your request for you!```"
            channel.send(instructions);
            const Discord = require("discord.js");
            const embeded = new Discord.MessageEmbed()
            .setColor('#79BD9A')
            .setTitle(`Need the Token/ID?`)
            .setURL(`https://www.writebots.com/discord-bot-token/`)
            .setDescription('Read a short tutorial')
            channel.send(embeded);
            channel.send("✍️ To continue, write your own -grow command!");
        })
    }
}