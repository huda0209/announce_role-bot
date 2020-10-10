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
 
ran by node.js

2020-10-10

*/

const help = async function(message,GuildData,BOT_DATA){
    let content = `**サーバー通知機能 使い方**\n\`${BOT_DATA.PREFIX}panel (省略形 ${BOT_DATA.PREFIX}pa) \`で通知のオンオフを設定できるパネルを生成します。\nリアクションすることでオンオフできます。\n\`${BOT_DATA.PREFIX}an <サーバー名> on/off \`でもオンオフが設定できます。\n設定できるサーバー 一覧\n\`\`\``
    for(let i=0;i<GuildData.roles.length;i++){
        content = `${content}${GuildData.roles[i][0]}, `;
    }
    content = `${content}\`\`\``;
    message.channel.send(content);
};

exports.help = help