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
 
ran by node.js

2020-10-10

*/

const panel = require('./command/panel.js');
const announceRole = require('./command/announceRole.js');
const help = require('./command/help.js');
const admin = require('./command/admin.js');
const arm = require('./command/announce_role_Manager')



const commandHandler = async function ([command, ...args],message,guildData,BOT_DATA,client){

    switch(command.toLowerCase()){
        case "panel" :
            panel.panelCreate(message,guildData);
            break;
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
        
        default :
            message.channel.send('不明なコマンドです。')
            break;
    };
}

exports.commandHandler = commandHandler