module.exports = {
    name: 'graft',
    description: "Graft new module - take in file",
    execute(client, message, args, db){
        message.channel.send('Please drag and drop or attach your module .js file here. If you do not have one, type -get_starter');
    }
}