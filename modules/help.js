module.exports = {
    name: 'help',
    description: "List all Botanist commands",
    execute(client, message, args){
        message.channel.send('Botanist command list: \n');
        message.channel.send('\tgrow <description of new bot>: create a new bot');
        message.channel.send('\tgraft: drag and drop a file to add to the open source modules');
        message.channel.send('\tmodules: print a list of all current possible modules (name only)');
    }
}