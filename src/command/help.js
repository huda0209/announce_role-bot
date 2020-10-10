/*

created by huda0209
announce role bot for discord bot 

main.js :MAIN  'MAIN CODE'
 -msgEvent.js :CLASS
 -panel.js  :CLASS
 -reactionEvent.js  :CLASS
 -role.js  :CLASS
 -help.js  :CLASS　<= this
 -admin.js  :CLASS
 
ran by node.js

2020-10-10

*/

class help {
    async help (message,GuildData,BOT_DATA){

        let content = `**サーバー通知機能 使い方**\n\`${BOT_DATA.PREFIX}panel (省略形 ${BOT_DATA.PREFIX}pa) \`で通知のオンオフを設定できるパネルを生成します。\nリアクションすることでオンオフできます。\n\`${BOT_DATA.PREFIX}an <サーバー名> on/off \`でもオンオフが設定できます。\n設定できるサーバー 一覧\n\`\`\``
        for(let i=0;i<GuildData.roles.length;i++){
            content = `${content}${GuildData.roles[i][0]}, `;
        }
        content = `${content}\`\`\``;
        message.channel.send(content);
    }
}

module.exports = help