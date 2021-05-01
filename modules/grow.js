module.exports = {
    name: 'grow',
    description: "Grow new bot",
    execute(message, db){
        message.channel.send('create a new bot');

        async function test(){
            const res = await db.ref('Test').push({
                test: "test - grow"
              });
            console.log(res);
        }
        test();

    }
}