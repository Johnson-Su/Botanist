// roulette gambling probability casino

const { Role } = require("discord.js");

module.exports = {
    name: 'roulette',
    description: "-roulette COLOR $MONEY (simulates a standard roulette wheel)",
    //-roulette color ammount
    execute(client, message, args){
        const result1 = Math.floor(Math.random() * 36);
        const result2 = Math.floor(Math.random() * 2);
        const win = args[0];
        var lost = "black";
        const ammount = args[1].substring(1);
        const moneydouble = ammount*2;
        if(win === "black"){
            lost = "red";
        } 
        if (result1 === 0){
            message.reply(`You got 0 [-$${ammount}]`);
        } else if (result2 === 0){
            message.reply(`You got ${win} [+$${moneydouble}]`);
        }
        else {
            message.reply(`You got ${lost} [-$${ammount}]`);
        }

    }
}