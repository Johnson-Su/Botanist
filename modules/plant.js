const { Role } = require("discord.js");

module.exports = {
    name: 'plant',
    description: "Plant a new bot",
    execute(client, message, db){
        //make temp channel with welcome
        message.guild.channels.create('botanist nursery', {
            type: 'text'
        }).then((channel) => {
            message.channel.send('Moving bot creation to botanist-nursery');
            channel.send('Welcome to the Nursery! This is where we will grow your custom discord bot for you!');
            var instructions = "```INSTRUCTIONS\nTo create a bot enter a command in the following format:\n\n-grow BOT_NAME BOT_TOKEN CLIENT_ID DESCRIPTION\nex// -grow GambleBot 237u1293712 I want a bot that can let me and my friends flip a coin\n\nPS. Write whatever you want! We use AI to create a bot to match your request for you!```"
            channel.send(instructions);
        })
    }
}