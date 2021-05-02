module.exports = {
    name: 'help',
    description: "List all Botanist commands",
    execute(message, args){
        message.channel.send('Botanist command list: \n');
        message.channel.send('    grow <description of new bot>: create a new bot');
        message.channel.send('    graft: drag and drop a file to add to the open source modules');
        message.channel.send('    modules: print a list of all current possible modules (name only)');
    }
}