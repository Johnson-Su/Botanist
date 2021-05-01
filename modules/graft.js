module.exports = {
    name: 'graft',
    description: "Graft new module - take in file",
    execute(message, args){
        message.channel.send('Drag and drop module file');
    }
}