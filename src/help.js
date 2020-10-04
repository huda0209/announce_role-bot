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


class help {
    constructor(client,json,roles,BOT_DATA) {
        this.client = client;
        this.json = json;
        this.roles = roles;
        this.BOT_DATA = BOT_DATA;
    }

    async help (message){
        const client = this.client;
        const json = this.json;
        const ROLES = this.roles;
        const BOT_DATA = this.BOT_DATA;

        let content = `**サーバー通知機能 使い方**\n\`${BOT_DATA.PREFIX}panel (省略形 ${BOT_DATA.PREFIX}pa) \`で通知のオンオフを設定できるパネルを生成します。\nリアクションすることでオンオフできます。\n\`${BOT_DATA.PREFIX}an <サーバー名> on/off \`でもオンオフが設定できます。\n設定できるサーバー 一覧\n\`\`\``
        for(let i=0;i<ROLES.length;i++){
            content = `${content}${ROLES[i][0]}, `;
        }
        content = `${content}\`\`\``;
        message.channel.send(content);
    }
}

module.exports = help