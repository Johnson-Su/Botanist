module.exports = {
    name: 'modules',
    description: "Print all available modules",
    execute(client, message, args){
        message.channel.send('print out all modules');
    }
}