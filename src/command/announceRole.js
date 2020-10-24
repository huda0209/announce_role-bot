/*

created by huda0209
announce role bot for discord bot 

main.js :MAIN  'MAIN CODE'
 -command-handler.js :module
 -panel.js  :module
 -reactionEvent.js  :module
 -announceRole.js  :module　<= this
 -help.js  :module
 -admin.js  :module
 
ran by node.js

2020-10-10

*/

const announceRole_Manager = async function ([command, ...args],message,guildData,BOT_DATA,client){

    let roleList = []
    for(let i=0;i<guildData.roles.length;i++){
          roleList.push(guildData.roles[i][0])};
    if(args.length === 2){
        const roleId = roleList.indexOf(args[0].toLowerCase());
        if(roleId === -1) return message.channel.send(`<@${message.author.id}>\n使い方 : ${BOT_DATA.PREFIX}an <${guildData.content.command_alias}名> on/off`);
        switch(args[1].toLowerCase()){
            case "on" :
                message.member.roles.add(guildData.roles[roleId][1]);
                message.channel.send(`<@${message.author.id}>\n${guildData.roles[roleId][0]}をONにしました。`);
                break;
            
            case "off" :
                message.member.roles.remove(guildData.roles[roleId][1]);
                message.channel.send(`<@${message.author.id}>\n${guildData.roles[roleId][0]}をOFFにしました。`);
                break;
            default : 
                message.channel.send(`<@${message.author.id}>\n使い方 : ${BOT_DATA.PREFIX}an <${guildData.content.command_alias}名> on/off`);
        };
    }else message.channel.send(`<@${message.author.id}>\n使い方 : ${BOT_DATA.PREFIX}an <${guildData.content.command_alias}名> on/off`);
};

exports.announceRole_Manager = announceRole_Manager