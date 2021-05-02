const { Role } = require("discord.js");
const fs = require('fs');
var archiver = require('archiver');
const language = require('@google-cloud/language');
const {Storage} = require('@google-cloud/storage');
const storage = new Storage();
const nlp_client = new language.LanguageServiceClient();

module.exports = {
    name: 'grow',
    description: "Grow your bot",
    async execute(client, message, args, db){
        message.channel.send("Growing your new Bot ...", {files: ["./growing.gif"]});
        var botName = args[0];
        var botToken = args[1];
        var clientId = args[2];

        await fs.writeFileSync('./GeneratedBot/auth.js', 
        "const BOT_TOKEN = '" + botName + "'; \n" + "const BOT_NAME = '" + botToken + "'; \n" + "const CLIENT_ID = '" + clientId + "'; \n" + "exports.BOT_TOKEN = BOT_TOKEN;\n" + "exports.BOT_NAME = BOT_NAME;\n" + "exports.CLIENT_ID = CLIENT_ID;\n",
        function (err) {
            if (err) throw err;
            console.log('Saved!');
          });


        var desc = args.slice(3, args.length).join(" ");

        // list of entities to compare tags with
        var check = [];  
        async function getEntities(text) {
            // NLP entity analysis
            const document = {
                content: text,
                type: 'PLAIN_TEXT',
            };

            // Detects entities in the document
            const [result] = await nlp_client.analyzeEntities({document});
            const entities = result.entities;
            // var array_len = entities.length;

            async function clearFirebase(){
                await db.ref('Request').remove();
            }
            clearFirebase().catch(console.error);

            entities.forEach(entity => {
                check.push(entity.name);
                async function addToFirebase(){
                    const res = await db.ref('Request').push().set({
                        entity: entity.name,
                        salience: entity.salience
                    });
                }
                addToFirebase().catch(console.error);
            });
        }
        getEntities(desc).catch(console.error);

        //transfers contents of file into another
        async function downloadFile(fileName,destName) {
            const options = {
              destination: destName,
            };
            // Downloads the file
            await storage.bucket("botanist-312407.appspot.com").file(fileName).download(options);
          }

        
        async function listFiles() {
            //clear Template Dir
            fs.rmdirSync("GeneratedBot/modules", { recursive: true });
            fs.mkdirSync("GeneratedBot/modules");
            fs.copyFileSync("modules/help.js","GeneratedBot/modules/help.js");

            const [files] = await storage.bucket("botanist-312407.appspot.com").getFiles();
            var best = "";
            var max_count = 0;
            //go into GeneratedBot dir
            process.chdir( "./GeneratedBot/modules" );
            files.forEach( file => {
                var current_count = 0;
                var moduleName = file.name.split(".")[0];
                var moduleNameRaw = file.name
                var tags = file.metadata.metadata.tags.split(/\s+/);
                tags.forEach(tag => {
                    if(check.includes(tag)){
                        fs.writeFileSync(moduleNameRaw,"");
                        downloadFile(moduleNameRaw,`./${moduleNameRaw}`).catch(console.error);
                        current_count++;
                    }
                });
                if(current_count > max_count){
                    best = moduleName;
                    max_count = current_count;
                }
            });
            if(max_count > 0){
                // message.channel.send("best module is: " + best);
            } else{
                message.channel.send("Unfortunately we currently do not have any modules that match what you are looking for");
            }
            // go back to og path
            process.chdir( ".." );
            process.chdir( ".." );
        }
        await listFiles().catch(console.error);

        async function zipFiles(){
            //zip up entire folder
            process.chdir( ".." );
            process.chdir( ".." );
            var output = fs.createWriteStream('CompletedBot.zip');
            var archive = archiver('zip');
            
            output.on('close', function () {
                console.log(archive.pointer() + ' total bytes');
                console.log('archiver has been finalized and the output file descriptor has closed.');
            });
            
            archive.on('error', function(err){
                throw err;
            });
            
            archive.pipe(output);
            
            console.log(process.cwd());
            archive.directory("GeneratedBot", "GeneratedBot");

            archive.finalize();

            output.on('finish', () => {
                setTimeout(() => {
                    const Discord = require("discord.js");
                    const embeded = new Discord.MessageEmbed()
                    .setColor('#79BD9A')
                    .setTitle(`Invite ${botName} to a server!`)
                    .setURL(`https://discord.com/oauth2/authorize?client_id=${clientId}&scope=bot`)
                    message.channel.send(embeded);
                    message.channel.send({ files: ["CompletedBot.zip"] }); 
                }, 5000);
                setTimeout(() => {
                    message.channel.send("```🌲 Download and open this zip and your desktop and run the included script!\n\n🌎 Your bot will go online and be ready to take on the world!\n\n❗ Once invited, use !help to view your bot's commands \n\n❌ To close this channel type -harvest```");
                }, 5500);
            });
        }
        
        await zipFiles().catch(console.error);
    }
}