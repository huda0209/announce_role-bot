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

2020-9-13

*/


class help {
    constructor(client,json,roles) {
        this.client = client;
        this.json = json;
        this.roles = roles;
    }

    async help (message){
        const client = this.client;
        const json = this.json;
        const ROLES = this.roles;

        var content = `**サーバー通知機能 使い方**\n\`/panel (省略形 /pa) \`で通知のオンオフを設定できるパネルを生成します。\nリアクションすることでオンオフできます。\n\`/an <サーバー名> on/off \`でもオンオフが設定できます。\n設定できるサーバー 一覧\n\`\`\``
        for(var i=0;i<ROLES.roles.length;i++){
            content = `${content}${ROLES.roles[i][0]}, `;
        }
        content = `${content}\`\`\``
        message.channel.send(content)
    }
}

module.exports = help