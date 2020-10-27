/*

created by huda0209
announce role bot for discord bot 

main.js :MAIN  'MAIN CODE'
 -command-handler.js :module
 -panel.js  :module
 -reactionEvent.js  :module
 -announceRole.js  :module
 -help.js  :module　<= this
 -admin.js  :module
 -announce_role_Manager.js  :module
 
ran by node.js

2020-10-27

*/

const help = async function(message,GuildData,BOT_DATA){
    let content = `**${GuildData.content.function_name} 使い方**\n\`${BOT_DATA.PREFIX}panel (省略形 ${BOT_DATA.PREFIX}pa) \`で通知のオンオフを設定できるパネルを生成します。\nリアクションすることでオンオフできます。\n\`${BOT_DATA.PREFIX}an <${GuildData.content.command_alias}名> on/off \`でもオンオフが設定できます。\n設定できる${GuildData.content.command_alias} 一覧\n\`\`\``
    for(let i=0;i<GuildData.roles.length;i++){
        content = `${content}${GuildData.roles[i][0]}${i<(GuildData.roles.length -1) ? ",":""} `;
    };
    content = `${content}\`\`\``;
    message.channel.send(content);
};

exports.help = help