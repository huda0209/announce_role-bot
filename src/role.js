/*

created by huda0209
announce role bot for discord bot 

main.js :MAIN  'MAIN CODE'
 -msgEvent.js :CLASS
 -panel.js  :CLASS
 -reactionEvent.js  :CLASS
 -role.js  :CLASS　<= this
 -help.js  :CLASS
 
ran by node.js

2020-10-4

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
        for(var i=0;i<ROLES.length;i++){
              serverList.push(ROLES[i][0])};

        if(args.length === 2){
            const serverId = serverList.indexOf(args[0].toLowerCase());
            if(serverId === -1) return message.channel.send(`<@${message.author.id}>\n使い方 : /an <サーバー名> on/off`);
            switch(args[1].toLowerCase()){
                case "on" :
                    message.member.roles.add(ROLES[serverId][1]);
                    message.channel.send(`<@${message.author.id}>\n${ROLES[serverId][0]}をONにしました。`);
                    break;
                
                case "off" :
                    message.member.roles.remove(ROLES[serverId][1]);
                    message.channel.send(`<@${message.author.id}>\n${ROLES[serverId][0]}をOFFにしました。`);
                    break;

                default : 
                    message.channel.send(`<@${message.author.id}>\n使い方 : /an <サーバー名> on/off`);
            };
        }else message.channel.send(`<@${message.author.id}>\n使い方 : /an <サーバー名> on/off`);
    };
}

module.exports = role