// moderator moderating kick permissions

const { Role } = require("discord.js");
module.exports = {
    name: 'kick',
    description: "-kick USER (kicks a user from the server)",
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