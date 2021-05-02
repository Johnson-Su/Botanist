module.exports = {
    name: 'help',
    description: "List all Botanist commands",
    execute(client, message, args){
        message.channel.send('Botanist command list: \n');
        message.channel.send('> -plant: begin your bot creation journey! (This will bring you to a temporary separate channel)');
        message.channel.send('> -grow BOT_NAME BOT_TOKEN DESCRIPTION: create a new bot');
        message.channel.send('> -harvest: finalize bot creation and exit the nursery');
        message.channel.send('> -graft: drag and drop a file to add to the open source modules');
        message.channel.send('> -modules: print a list of all current possible modules (name only)');
        message.channel.send('> -get_starter: download the starter code template for creating a module');
    }
}
