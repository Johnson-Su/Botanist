// ping pong

module.exports = {
    name: 'ping',
    description: "-ping (debugging command)",
    execute(client, message, args){
        message.channel.send('pong!');
    }
}