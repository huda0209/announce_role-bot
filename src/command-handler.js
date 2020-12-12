/*

created by huda0209
announce role bot for discord bot 

main.js :MAIN  'MAIN CODE'
 -command-handler.js :module　<= this
 -panel.js  :module
 -reactionEvent.js  :module
 -announceRole.js  :module
 -help.js  :module
 -admin.js  :module
 -announce_role_Manager.js  :module
 
ran by node.js

2020-10-27

*/
const logger = require('./util/logger')
const panel = require('./command/panel.js');
const announceRole = require('./command/announceRole.js');
const help = require('./command/help.js');
const admin = require('./command/admin/admin.js');
const arm = require('./command/admin/announce_role_Manager')
const main = require('../main')



const commandHandler = async function ([command, ...args],message,guildData,BOT_DATA,client){

    switch(command.toLowerCase()){
        case "panel" :
        case "pa" :
            panel.panelCreate(message,guildData);
            break;
        case "an" :
            announceRole.announceRole_Manager([command, ...args],message,guildData,BOT_DATA);
            break;
        case "help" :
            help.help(message,guildData,BOT_DATA);
            break;
        case "arb" :
            if(!(message.author.id === message.guild.ownerID || guildData.guild.Admin.indexOf(message.author.id)>-1)) break;
            arb_command_handler([command, ...args],message,guildData,BOT_DATA,client)
            break;
      }
}

function arb_command_handler([command, ...args],message,guildData,BOT_DATA,client){
    
    switch(args[0].toLowerCase()){
        case "admin" :
            admin.adminManager([command, ...args],message,guildData,client)
            break;
        
        case "role" :
            arm.arm_command_handler([command, ...args],message,guildData,BOT_DATA,client)
            break; 

        case "reload" :
            main.configReload("get");
            logger.info("config reloaded");
            message.channel.send("コンフィグを再読み込みしました。");
            break;

        case "stop" :
            logger.info(`server was stoped by {cyan}${message.author.tag}`);
			await message.delete();
			client.destroy();
			process.exit(0)
        
        default :
            message.channel.send('不明なコマンドです。')
            break;
    };
}

exports.commandHandler = commandHandler