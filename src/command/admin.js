/*

created by huda0209
announce role bot for discord bot 

main.js :MAIN  'MAIN CODE'
 -command-handler.js :module
 -panel.js  :module
 -reactionEvent.js  :module
 -announceRole.js  :module
 -help.js  :module
 -admin.js  :module　<= this
 -announce_role_Manager.js  :module
 
ran by node.js

2020-10-27

*/

const fs = require('fs');
const logger = require('../util/logger.js')
const main = require('../../main');


const adminManager = async function ([command, ...args],message,guildData,client){
    switch(args[1].toLowerCase()){
        case "add" :
            if(args.length<2) return message.channel.send(`コマンドの引数が足りません。`);
            if(guildData.guild.Admin.indexOf(message.mentions.members.first().id)>=0) return message.channel.send(`そのユーザーは追加済みです`);
            guildData.guild.Admin.push(message.mentions.members.first().id);
            fs.writeFileSync('./config/guild/guild.json', JSON.stringify(guildData, null, "\t"),'utf8');
            main.configReload("get");
            logger.info(`Add admin {green}${message.mentions.members.first().user.tag}`);
            message.channel.send(`ユーザーを追加しました`);
            break;

        case "delete" :
            if(args.length<2) return message.channel.send(`コマンドの引数が足りません。`);
            if(guildData.guild.Admin.indexOf(message.mentions.members.first().id)==-1) return message.channel.send(`そのユーザーはリストに入っていません`);
            delete guildData.guild.Admin[guildData.guild.Admin.indexOf(message.mentions.members.first().id)];
            guildData.guild.Admin = guildData.guild.Admin.filter(Boolean);
            fs.writeFileSync('./config/guild/guild.json', JSON.stringify(guildData, null, "\t"),'utf8');
            main.configReload("get");
            logger.info(`Remove admin {red}${message.mentions.members.first().user.tag}`);
            message.channel.send(`ユーザーを削除しました`);
            break;

        case "list" :
            let adminList = `**announce role bot  Adminリスト**\nOwner : *${(await client.users.fetch(message.guild.ownerID)).tag}*\nAdmin :`;
            if(guildData.guild.Admin.length<1){
                adminList = `${adminList} なし`;
            }
            for(let i=0;i<guildData.guild.Admin.length;i++){
                adminList = `${adminList}\n*${(await client.users.fetch(guildData.guild.Admin[i])).tag}*`;
            };
            message.channel.send(adminList)
            break;

        default :
            message.channel.send(`コマンドが違います。`);
            break;
    };
};


exports.adminManager = adminManager