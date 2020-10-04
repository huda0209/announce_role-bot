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

const panel = require('./panel.js');
const role = require('./role.js');
const help = require('./help.js');

const letter = [[":zero:","0⃣"],[":one:","1⃣"],[":two:","2⃣"],[":three:","3⃣"],[":four:","4⃣"],[":five:","5⃣"],[":six:","6⃣"],[":seven:","7⃣"],[":eight:","8⃣"],[":nine:","9⃣"],[":keycap_ten:","🔟"],[":regional_indicator_a:","🇦"],[":regional_indicator_b:","🇧"],[":regional_indicator_c:","🇨"],[":regional_indicator_d:","🇩"],[":regional_indicator_e:","🇪"],[":regional_indicator_f:","🇫"],[":regional_indicator_g:","🇬"],[":regional_indicator_h:","🇭"],[":regional_indicator_i:","🇮"],[":regional_indicator_j:","🇯"],[":regional_indicator_k:","🇰"],[":regional_indicator_l:","🇱"],[":regional_indicator_m:","🇲"],[":regional_indicator_n:","🇳"],[":regional_indicator_o:","🇴"],[":regional_indicator_p:","🇵"],[":regional_indicator_q:","🇶"],[":regional_indicator_r:","🇷"],[":regional_indicator_s:","🇸"],[":regional_indicator_t:","🇹"],[":regional_indicator_u:","🇺"],[":regional_indicator_v:","🇻"],[":regional_indicator_w:","🇼"],[":regional_indicator_x:","🇽"],[":regional_indicator_y:","🇾"],[":regional_indicator_z:","🇿"]]


class msgEvent {
    constructor(client,message,json,BOT_DATA) {
        this.client = client;
        this.message = message;
        this.json = json.guild;
        this.roles = json.roles;
        this.BOT_DATA = BOT_DATA;
    }

    async msgEvent ([command, ...args]){
        const client = this.client;
        const message = this.message;
        const json = this.json;
        const roles = this.roles;
        const BOT_DATA = this.BOT_DATA;

        const panele = new panel(client,json,roles);
        const rolee = new role(client,json,roles);
        const helpe = new help(client,json,roles,BOT_DATA);

        switch(command.toLowerCase()){
            case "panel" :
                panele.panelCreate(message);
                break;

            case "pa" :
                panele.panelCreate(message);
                break;

            case "an" :
                rolee.roleAdd([command, ...args],message);
                break;

            case "help" :
                helpe.help(message);
                break;
          }
    }
}

module.exports = msgEvent