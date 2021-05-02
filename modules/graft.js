module.exports = {
    name: 'graft',
    description: "Graft new module - take in file",
    execute(message, args){
        message.channel.send('Drag and drop module file');

        async function uploadFile() {
            const bucket = storage.bucket("botanist-312407.appspot.com");
        
            const image_options = {
                destination: "uploaded-file.js"
            }
            bucket.upload('./modules/plant.js', image_options, function(err, file, apiResponse) {});
        
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