// [use this line to format relevant tags separated by whitespaces] (ex. // moderator roles permissions)

const { Role } = require("discord.js");

module.exports = {
    // Your module will be triggered by its name. Try to make it descriptive but easy to type!
    name: 'your_module_name',
    description: "My new cool module!",
    execute(client, message, args){ // 
        /*
        client: the Discord client instance, you don't need to do anything with this
        message: the full message that triggered this module
        args: an array of each word in the message (ex. ["your_module_name", "first", "word"]);
        */

       message.channel.send('This is the start of my module');

        // your code here!

    }
}
