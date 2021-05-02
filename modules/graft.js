module.exports = {
    name: 'graft',
    description: "Graft new module - take in file",
    execute(client, message, db){
        message.channel.send('Please drag and drop your module .js file. If you do not have one, type -get_starter');
    }
}