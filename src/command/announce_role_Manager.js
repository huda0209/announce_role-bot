/*

created by huda0209
announce role bot for discord bot 

main.js :MAIN  'MAIN CODE'　<= this
 -command-handler.js :module
 -panel.js  :module
 -reactionEvent.js  :module
 -announceRole.js  :module
 -help.js  :module
 -admin.js  :module
 -announce_role_Manager.js  :module
 
ran by node.js

2020-10-25

*/

const fs = require('fs');
const logger =require('../util/logger');
const main = require('../../main');

const arm_command_handler = function([command, ...args],message,guildData,BOT_DATA,client){
    const role_name = args[2];
    const color = args[3];

    if(args[1] == "add") role_Create(message,guildData,role_name,color);
    if(args[1] == "delete") role_Delete(message,guildData,role_name);
}

const role_Create = async function(message,guildData,role_name,color){
    const colorId = color == undefined ? "0" : color;
    const role = await message.guild.roles.create({
        data: {
            name : role_name,
            permissions : 0,
            color : colorId
        }
    });
    const position = ((await message.guild.roles.fetch(guildData.roles[guildData.roles.length-1][1])).position - 1);
    await (await message.guild.roles.fetch(role.id)).setPosition(position);
    guildData.roles.push([role_name , role.id]);
    fs.writeFileSync('./config/guild/guild.json', JSON.stringify(guildData, null, "\t"),'utf8');
    main.configReload("get");
    message.channel.send(`${role.name}を作成しました。`)
    logger.info(`create new role! {green}${role.name}`);
}

const role_Delete = async function(message,guildData,role_name){
    let roleList = [];
    for(let i=0;i<guildData.roles.length;i++){
        roleList.push(guildData.roles[i][0]);
    };
    const roleId = roleList.indexOf(role_name);
    if(roleId == -1) return message.channel.send(`指定されたロールはありません。`)
    await (await message.guild.roles.fetch(guildData.roles[roleId][1])).delete();
    delete guildData.roles[roleId];
    guildData.roles = guildData.roles.filter(Boolean);
    fs.writeFileSync('./config/guild/guild.json', JSON.stringify(guildData, null, "\t"),'utf8');
    main.configReload("get");
    message.channel.send(`${role_name}を削除しました。`)
    logger.info(`delete role ${role_name}`)
}

exports.arm_command_handler = arm_command_handler