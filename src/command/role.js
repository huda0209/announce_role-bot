/*

created by huda0209
announce role bot for discord bot 

main.js :MAIN  'MAIN CODE'
 -msgEvent.js :CLASS
 -panel.js  :CLASS
 -reactionEvent.js  :CLASS
 -role.js  :CLASS　<= this
 -help.js  :CLASS
 -admin.js  :CLASS
 
ran by node.js

2020-10-10

*/

class role {
    constructor(client) {
        this.client = client;
    }

    async roleAdd ([command, ...args],message,guildData,BOT_DATA){

        var roleList = []
        for(var i=0;i<guildData.roles.length;i++){
              roleList.push(guildData.roles[i][0])};

        if(args.length === 2){
            const roleId = roleList.indexOf(args[0].toLowerCase());
            if(roleId === -1) return message.channel.send(`<@${message.author.id}>\n使い方 : ${BOT_DATA.PREFIX}an <サーバー名> on/off`);
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
                    message.channel.send(`<@${message.author.id}>\n使い方 : ${BOT_DATA.PREFIX}an <サーバー名> on/off`);
            };
        }else message.channel.send(`<@${message.author.id}>\n使い方 : ${BOT_DATA.PREFIX}an <サーバー名> on/off`);
    };
}

module.exports = role