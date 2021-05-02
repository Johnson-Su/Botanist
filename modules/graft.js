const {Storage} = require('@google-cloud/storage');
const storage = new Storage();

module.exports = {
    name: 'graft',
    description: "Graft new module - take in file",
    execute(client, message, db){
        message.channel.send('Please drag and drop your module .js file. If you do not have one, type -get_starter');

        
        async function uploadFile() {
            const bucket = storage.bucket("botanist-312407.appspot.com");
        
            const image_options = {
                destination: "new-file.js",
                metadata: {
                    metadata: {
                      tags: 'tag1 tag2 tag3' // parse first line comment, splice whitespace
                    }
                  }
            }
            await bucket.upload('./modules/plant.js', image_options, function(err, file, apiResponse) {});
        
            const bucket_options = {
                includeFiles: true,
                force: true
            };
            bucket.makePublic(bucket_options, function(err, files) {});
            console.log('Uploaded a raw string!');
        }
        uploadFile();

    }
}