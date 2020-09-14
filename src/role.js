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

2020-9-14

*/

class role {
    constructor(client,json,roles) {
        this.client = client;
        this.json = json;
        this.roles = roles;
    }

    async roleAdd ([command, ...args],message){
        const client = this.client;
        const json = this.json;
        const ROLES = this.roles;

        var serverList = []
        for(var i=0;i<ROLES.roles.length;i++){
              serverList.push(ROLES.roles[i][0]);
        }

        if(args.length === 2){
            const serverId = serverList.indexOf(args[0].toLowerCase());
            switch(args[1].toLowerCase()){
                case "on" :
                    message.member.roles.add(ROLES.roles[serverId][1]);
                    message.channel.send(`<@${message.author.id}>\n${ROLES.roles[serverId][0]}をONにしました。`);
                    break;
                
                case "off" :
                    message.member.roles.remove(ROLES.roles[serverId][1]);
                    message.channel.send(`<@${message.author.id}>\n${ROLES.roles[serverId][0]}をOFFにしました。`);
                    break;

                default : 
                    message.channel.send(`<@${message.author.id}>\n使い方 : /an <サーバー名> on/off`);
            };
        }else message.channel.send(`<@${message.author.id}>\n使い方 : /an <サーバー名> on/off`);
    };
}

module.exports = role