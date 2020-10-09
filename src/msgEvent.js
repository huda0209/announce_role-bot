/*

created by huda0209
announce role bot for discord bot 

main.js :MAIN  'MAIN CODE'
 -msgEvent.js :CLASS　<= this
 -panel.js  :CLASS
 -reactionEvent.js  :CLASS
 -role.js  :CLASS
 -help.js  :CLASS
 -admin.js  :CLASS
 
ran by node.js

2020-10-10

*/

const panel = require('./panel.js');
const role = require('./role.js');
const help = require('./help.js');
const admin = require('./admin.js')


class msgEvent {
    constructor(client) {
        this.client = client;
    }

    async msgEvent ([command, ...args],message,guildData,BOT_DATA){
        const client = this.client;

        const panele = new panel();
        const rolee = new role(client);
        const helpe = new help();
        const admine = new admin(client)

        switch(command.toLowerCase()){
            case "panel" :
                panele.panelCreate(message,guildData);
                break;

            case "pa" :
                panele.panelCreate(message,guildData);
                break;

            case "an" :
                rolee.roleAdd([command, ...args],message,guildData,BOT_DATA);
                break;

            case "admin" :
                if(!(message.author.id === message.guild.ownerID || guildData.guild.Admin.indexOf(message.author.id)>-1)) break;
                admine.admin([command, ...args],message,guildData)
                break;

            case "help" :
                helpe.help(message,guildData,BOT_DATA);
                break;
          }
    }
}

module.exports = msgEvent