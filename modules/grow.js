const { Role } = require("discord.js");
const language = require('@google-cloud/language');
const {Storage} = require('@google-cloud/storage');

const storage = new Storage();
const nlp_client = new language.LanguageServiceClient();

module.exports = {
    name: 'grow',
    description: "Grow your bot",
    execute(client, message, args, db){
        var botName = args[0];
        var botToken = args[1];
        var desc = args.slice(2, args.length).join(" ");

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

        
        async function listFiles() {
            // Lists files in the bucket
            const [files] = await storage.bucket("botanist-312407.appspot.com").getFiles();
          
            var best = "";
            var max_count = 0;
            files.forEach(file => {
                var current_count = 0;
                var moduleName = file.name.split(".")[0];
                var tags = file.metadata.metadata.tags.split(/\s+/);
                tags.forEach(tag => {
                    if(check.includes(tag)){
                        current_count++;
                    }
                });
                if(current_count > max_count){
                    best = moduleName;
                    max_count = current_count;
                }
            });
            if(max_count > 0){
                message.channel.send("best module is: " + best);
            } else{
                message.channel.send("Unfortunately we currently do not have any modules that match what you are looking for");
            }
            
        }
        listFiles().catch(console.error);
    }
}