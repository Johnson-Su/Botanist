module.exports = {
    name: 'graft',
    description: "Graft new module - take in file",
    execute(client, message, args, db){
        message.guild.channels.create('branch', {
            type: 'text'
        }).then((channel) => {
            message.reply('Moving grafting location to branch 🌱');
            channel.send('Please drag and drop or attach your module .js file here. If you do not have one, type -get_starter');
            channel.send('Once you are done type -harvest to exit');
        })
    }
}