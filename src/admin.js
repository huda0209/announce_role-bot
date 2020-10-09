/*

created by huda0209
announce role bot for discord bot 

main.js :MAIN  'MAIN CODE'
 -msgEvent.js :CLASS
 -panel.js  :CLASS
 -reactionEvent.js  :CLASS
 -role.js  :CLASS
 -help.js  :CLASS
 -admin.js  :CLASS　<= this
 
ran by node.js

2020-10-10

*/

const fs = require('fs');
const color = require('./color.js')

class admin {
    constructor(client) {
        this.client = client;
    }

    async admin ([command, ...args],message,guildData){

        if(args.length<2) return message.channel.send(`コマンドの引数が足りません。`);
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
}

module.exports = admin