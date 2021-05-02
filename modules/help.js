const { Role } = require("discord.js");
const fs = require('fs');
module.exports = {
    name: 'help',
    description: "List all Botanist commands",
    async execute(client, message, args){
        var nameArray = [];
        var finalString = "";
        async function readFile() {
            fs.readdirSync("./modules").forEach(file => {
                const cmdName = file;
                const splitName = (cmdName.split(".")[0]).toString();
                if(cmdName.includes(".js") && splitName!="starter"){
                    nameArray.push(`${splitName}`);
                }
            });
        }
        await readFile();
        nameArray.forEach(namez => 
            finalString = finalString + client.commands.get(namez).description + '\n'
        );
        message.channel.send(finalString);
    }
}