const { Role } = require("discord.js");

module.exports = {
    name: 'harvest',
    description: "Harvest your new bot",
    execute(client, message, db){
        if(message.channel.name === 'botanist-nursery')
        message.channel.delete();
    }
}