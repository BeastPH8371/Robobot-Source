// require the discord.js module
const Discord = require('discord.js');

// connect us to the config.json file
const config = require('./config.json');

// create a new Discord Client 
const Client = new Discord.Client({disableEveryone: true});

// require the fs module
const fs = require('fs');

// when i type xpfile it will connect to the xp.json file
const xpfile = require('./xp.json')

// The message that we will get in terminal when we lunch the bot
Client.on("ready", async () => {
    console.log(`${Client.user.username} is Online!`)

});









Client.on("message", async message => {
    if(message.author.Client || message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1)


    // If Someone Send =hi the bot will respond by Hello There!
    if(cmd === `${prefix}hi`) {
        return message.channel.send("Hello There!")
    }

    // if someone say =hello the bot will mention/ping him then say hello, how are you?
    if(cmd === `${prefix}hello`) {
        return message.reply("hello, how are you?")
    }

})








// Level System


Client.on("message" ,function(message) {
    if(message.author.Client) return;
    var addXP = Math.floor(Math.random() * 10); //when i type addXP it will randomly choose a number between 1-10   [  Math.floor(Math.random() * 10)  ]
// lvl 1 statics
    if(!xpfile[message.author.id]) {
        xpfile[message.author.id] = {
           xp: 0,
           level: 1,
           reqxp: 100
        }
// catch errors
       fs.writeFile("./xp.json",JSON.stringify(xpfile),function(err){ 
        if(err) console.log(err)
       })
    }

    xpfile[message.author.id].xp += addXP

    if(xpfile[message.author.id].xp > xpfile[message.author.id].reqxp){
        xpfile[message.author.id].xp -= xpfile[message.author.id].reqxp // it will subtrsct xp whenever u pass a lvl
        xpfile[message.author.id].reqxp *= 2 // XP you need to increase if level 1 is 100 xp so lvl 2 will 200 xp (multiplied by 2 [   .reqxp *= 2  ])
        xpfile[message.author.id].reqxp = Math.floor(xpfile[message.author.id].reqxp) // XP Round
        xpfile[message.author.id].level += 1 // it add 1 level when u level up

// this code will send (" you are now level [your lvl]!") then it will delete it after 10 seconds        
        message.reply("You Are Now Level **"+xpfile[message.author.id].level+"**!").then( 
            msg=>msg.delete({timeout: "10000"})
        )

    }
// catch errors
    fs.writeFile("./xp.json",JSON.stringify(xpfile),function(err){
        if(err) console/log(err)
    })

    //if someone typed in chat =level it will make a embed 
    if(message.content.startsWith("c!level")){
        let user = message.mentions.users.first() || message.author

        let embed = new Discord.MessageEmbed()
        .setTitle("Your Chill & Relax Level Card")
        .setColor("GREEN")
        .addField("Level: ",xpfile[user.id].level)
        .addField("XP: ", xpfile[user.id].xp+"/"+xpfile[user.id].reqxp)
        .addField("XP Required: ",xpfile[user.id].reqxp)
        message.channel.send(embed)
    }
})   

        

// Login To Discord with your app's Token
Client.login(config.token);

