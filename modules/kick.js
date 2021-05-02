const { Role } = require("discord.js");
module.exports = {
    name: 'kick',
    description: "Kick a user",
    execute(client, message, args){
        console.log(message.mentions.members.first());
        if (message.mentions.members.first()) {
            try {
                message.mentions.members.first().kick();
            } catch {
                message.reply("I do not have permissions to kick " + message.mentions.members.first());
            }
        } else {
            message.reply("You do not have permissions to kick " + message.mentions.members.first());
        }
    }
}