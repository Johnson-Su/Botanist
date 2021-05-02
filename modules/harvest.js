const { Role } = require("discord.js");

module.exports = {
    name: 'harvest',
    description: "-harvest (closes bot created servers)",
    execute(client, message, db){
        if(message.channel.name === 'botanist-nursery' || message.channel.name === 'branch')
        message.channel.delete();
    }
}