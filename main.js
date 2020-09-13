/*

created by huda0209
announce role bot for discord bot 

main.js :MAIN  'MAIN CODE'　<= this
 -msgEvent.js :CLASS
 -panel.js  :CLASS
 -reactionEvent.js  :CLASS
 
ran by node.js

2020-9-13

*/

//node.js modules
const fs = require('fs');
const discord = require("discord.js");

//class
const msgEvent = require('./src/msgEvent.js')
const reactionEvent = require('./src/reactionEvent.js')
//const panel = require('./class/panel.js')

//other 
var json = JSON.parse(fs.readFileSync('./config/setting.json','utf8'));
const roles = JSON.parse(fs.readFileSync('./config/roles.json','utf8'));
const client = new discord.Client();
const letter = [[":zero:","0⃣"],[":one:","1⃣"],[":two:","2⃣"],[":three:","3⃣"],[":four:","4⃣"],[":five:","5⃣"],[":six:","6⃣"],[":seven:","7⃣"],[":eight:","8⃣"],[":nine:","9⃣"],[":keycap_ten:","🔟"],[":regional_indicator_a:","🇦"],[":regional_indicator_b:","🇧"],[":regional_indicator_c:","🇨"],[":regional_indicator_d:","🇩"],[":regional_indicator_e:","🇪"],[":regional_indicator_f:","🇫"],[":regional_indicator_g:","🇬"],[":regional_indicator_h:","🇭"],[":regional_indicator_i:","🇮"],[":regional_indicator_j:","🇯"],[":regional_indicator_k:","🇰"],[":regional_indicator_l:","🇱"],[":regional_indicator_m:","🇲"],[":regional_indicator_n:","🇳"],[":regional_indicator_o:","🇴"],[":regional_indicator_p:","🇵"],[":regional_indicator_q:","🇶"],[":regional_indicator_r:","🇷"],[":regional_indicator_s:","🇸"],[":regional_indicator_t:","🇹"],[":regional_indicator_u:","🇺"],[":regional_indicator_v:","🇻"],[":regional_indicator_w:","🇼"],[":regional_indicator_x:","🇽"],[":regional_indicator_y:","🇾"],[":regional_indicator_z:","🇿"]]


//start the bot
client.on("ready", message => {
  console.log(`bot is ready! ver: test \nlogin: ${client.user.tag}`);
  client.user.setActivity('discord bot ver. 0.0.1', { type: 'PLAYING' })
});

//when bot join the guild, this event will load
client.on("guildCreate", bot =>{
    
  const GuildId = bot.id;
  const Owner = bot.ownerID;

  const adddata ={
              "GuildId" : GuildId,
              "Owner" : Owner,
             }
  json.guild = (adddata)
  fs.writeFileSync('./config/setting.json', JSON.stringify(json),'utf8');
  console.log("guildCreate catch")
  })

//message event
client.on("message", async message => {

  const prefix = '/'
  if (message.content.startsWith(prefix)){
    const [command, ...args] = message.content.slice(prefix.length).split(' ')
    if(command === "stop"){
      if(message.author.id === json.guild.Owner || message.author.id === message.guild.ownerID){
        console.log(`server stop. by${message.author.tag}`);
        await message.delete()
        process.exit(0);}
    };
    const msge = new msgEvent(client,message,json)
    msge.msgEvent([command, ...args],roles)
  };


})

client.on("messageReactionAdd", async(messageReaction ,user) =>{
  if(user.bot) return;
  const reactionEvente = new reactionEvent(client,json,roles)
  reactionEvente.addrole(messageReaction ,user)
})    


if(json.bot.MAIN_TOKEN == undefined || json.bot.MAIN_TOKEN == ""){
  console.log("please set setting.json : MAIN_TOKEN");
  process.exit(0);
}
var token;
if(process.argv.length>=3){
  switch(process.argv[2]){
    case "main" :
      token = json.bot.MAIN_TOKEN;
      break;
    case "test" :
      if(json.bot.TEST_TOKEN == undefined || json.bot.TEST_TOKEN == ""){
        console.log("please set setting.json : TEST_TOKEN");
        process.exit(0);
      }
      token = json.bot.TEST_TOKEN;
      break;
    default :
      console.log(`\nUnknown command. \nUsage \n node main.js main : use main token \n node main.js test : use test token`)
      process.exit(0);
  };
}else token = json.bot.MAIN_TOKEN
client.login(token);