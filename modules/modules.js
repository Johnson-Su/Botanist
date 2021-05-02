const {Storage} = require('@google-cloud/storage');

const storage = new Storage();

module.exports = {
    name: 'modules',
    description: "Print all available modules",
    execute(client, message, args, db){
        message.channel.send('All available modules:');

        async function listFiles() {
            // Lists files in the bucket
            const [files] = await storage.bucket("botanist-312407.appspot.com").getFiles();
          
            files.forEach(file => {
                var moduleName = file.name.split(".")[0];
                message.channel.send(" > " + moduleName);
            });
        }
        listFiles().catch(console.error);
    }
}