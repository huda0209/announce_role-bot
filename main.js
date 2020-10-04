/*

created by huda0209
announce role bot for discord bot 

main.js :MAIN  'MAIN CODE'　<= this
 -msgEvent.js :CLASS
 -panel.js  :CLASS
 -reactionEvent.js  :CLASS
 -role.js  :CLASS
 -help.js  :CLASS
 
ran by node.js

2020-10-4

*/

//node.js modules
const fs = require('fs');
const discord = require("discord.js");

//class
const msgEvent = require('./src/msgEvent.js');
const reactionEvent = require('./src/reactionEvent.js');

//config
let guildData = JSON.parse(fs.readFileSync('./config/guild/guild.json','utf8'));
const BOT_DATA = JSON.parse(fs.readFileSync('./config/setting.json','utf8'));

//other 
const option = {ws: {intents: discord.Intents.ALL}, restTimeOffset: 10};
const color = require('./src/color');
const client = new discord.Client(option);
const letter = [[":zero:","0⃣"],[":one:","1⃣"],[":two:","2⃣"],[":three:","3⃣"],[":four:","4⃣"],[":five:","5⃣"],[":six:","6⃣"],[":seven:","7⃣"],[":eight:","8⃣"],[":nine:","9⃣"],[":keycap_ten:","🔟"],[":regional_indicator_a:","🇦"],[":regional_indicator_b:","🇧"],[":regional_indicator_c:","🇨"],[":regional_indicator_d:","🇩"],[":regional_indicator_e:","🇪"],[":regional_indicator_f:","🇫"],[":regional_indicator_g:","🇬"],[":regional_indicator_h:","🇭"],[":regional_indicator_i:","🇮"],[":regional_indicator_j:","🇯"],[":regional_indicator_k:","🇰"],[":regional_indicator_l:","🇱"],[":regional_indicator_m:","🇲"],[":regional_indicator_n:","🇳"],[":regional_indicator_o:","🇴"],[":regional_indicator_p:","🇵"],[":regional_indicator_q:","🇶"],[":regional_indicator_r:","🇷"],[":regional_indicator_s:","🇸"],[":regional_indicator_t:","🇹"],[":regional_indicator_u:","🇺"],[":regional_indicator_v:","🇻"],[":regional_indicator_w:","🇼"],[":regional_indicator_x:","🇽"],[":regional_indicator_y:","🇾"],[":regional_indicator_z:","🇿"]];
const prefix = BOT_DATA.PREFIX


//start the bot
client.on("ready", message => {
  console.log(`${color.header.info}bot is ready! ver. ${BOT_DATA.VERSION} \n        login: ${color.chcol.cyan}${client.user.tag}${color.reset}\n`);
  client.user.setActivity(`${prefix}helpでヘルプを表示 ver. ${BOT_DATA.VERSION}`, { type: 'PLAYING' });
});

//when bot join the guild, this event will load
client.on("guildCreate", bot =>{
  const adddata ={
              "GuildId" : bot.id,
              "Owner" : bot.ownerID,
              "Admin" : []
             };
  guildData.guild = adddata;
  fs.writeFileSync('./config/guild/guild.json', JSON.stringify(guildData, null, "\t"),'utf8');
  console.log(`${color.header.info}guildCreate catch`);
  })

//message event
client.on("message", async message => {
  if (message.content.startsWith(prefix)){
    const [command, ...args] = message.content.slice(prefix.length).split(' ');
    if(command === "stop" &&(message.author.id === message.guild.ownerID || guildData.guild.Admin.indexOf(message.author.id)>-1)){
        console.log(`${color.header.info}server was stoped by ${message.author.tag}`);
        await message.delete();
        client.destroy();
        process.exit(0)};
    const msge = new msgEvent(client,message,guildData,BOT_DATA);
    msge.msgEvent([command, ...args]);
    
    if(command.toLowerCase() === "admin" &&(message.author.id === message.guild.ownerID || guildData.guild.Admin.indexOf(message.author.id)>-1)){
      switch(args[0].toLowerCase()){
          case "add" :
              if(guildData.guild.Admin.indexOf(message.mentions.members.first().id)>=0) return message.channel.send(`そのユーザーは追加済みです`);
              guildData.guild.Admin.push(message.mentions.members.first().id);
              fs.writeFileSync('./config/guild/guild.json', JSON.stringify(guildData, null, "\t"),'utf8');
              console.log(`${color.header.info}Add admin ${message.mentions.members.first().user.tag}`);
              message.channel.send(`ユーザーを追加しました`);
              break;

          case "remove" :
              if(guildData.guild.Admin.indexOf(message.mentions.members.first().id)==-1) return message.channel.send(`そのユーザーはリストに入っていません`);
              delete guildData.guild.Admin[guildData.guild.Admin.indexOf(message.mentions.members.first().id)];
              fs.writeFileSync('./config/guild/guild.json', JSON.stringify(guildData, null, "\t"),'utf8');
              console.log(`${color.header.info}Remove admin ${message.mentions.members.first().user.tag}`);
              message.channel.send(`ユーザーを削除しました`);
              break;

          default :
              message.channel.send(`コマンドが違います。`);
              break;
      };
    };
  };
})

client.on("messageReactionAdd", async(messageReaction ,user) =>{
  if(user.bot) return;
  const reactionEvente = new reactionEvent(client,guildData);
  reactionEvente.addrole(messageReaction ,user);
})    


if(BOT_DATA.MAIN_TOKEN == undefined || BOT_DATA.MAIN_TOKEN == ""){
  console.log(`${color.header.error}please set setting.json : ${color.chcol.cyan}MAIN_TOKEN${color.reset}`);
  process.exit(0);
}
let token;
if(process.argv.length>=3){
  switch(process.argv[2]){
    case "main" :
      token = BOT_DATA.MAIN_TOKEN;
      break;
    case "div" :
      if(BOT_DATA.DIV_TOKEN == undefined || BOT_DATA.DIV_TOKEN == ""){
        console.log(`${color.header.error}please set setting.json : ${color.chcol.cyan}DIV_TOKEN${color.reset}`);
        process.exit(0)};
      token = BOT_DATA.DIV_TOKEN;
      BOT_DATA.VERSION = `dev(${BOT_DATA.VERSION})`;
      break;
    default :
      console.log(`${color.header.error}Unknown command. \n${color.chcol.cyan}Usage${color.reset} \n node main.js main : use main token \n node main.js div : use divelopment token`);
      process.exit(0);
  };
}else token = BOT_DATA.MAIN_TOKEN;
client.login(token);
