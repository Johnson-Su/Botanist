const { Role } = require("discord.js");
var Scraper = require('images-scraper');
//Thanks to CodeLyon for the start code
const google = new Scraper({
    puppeteer: {
      headless: true,
    },
  });

module.exports = {
    name: 'image',
    description: "Scrape for relevant image!",
    //-roulette color ammount
    async execute(client, message, args){
        const image_query = args.join(' ');
        if(!image_query) return message.channel.send("Please enter an image name");

        const image_results = await google.scrape(image_query, 1);
        message.channel.send(image_results[0].url);

    }
}