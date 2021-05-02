const { Role } = require("discord.js");

module.exports = {
    name: 'get_starter',
    description: "Send template module starter code",
    execute(client, message, args){ // 

       message.channel.send("Download and follow this template for your new module! Don't forget to rename the file to your module name.", { files: ["./modules/starter.js"] });

    }
}
