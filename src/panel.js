/*

created by huda0209
announce role bot for discord bot 

main.js :MAIN  'MAIN CODE'　<= this
 -msgEvent.js :CLASS
 -panel.js  :CLASS
 -reactionEvent.js  :CLASS
 
ran by node.js

2020-9-13

*/

/*
const dotenv = require('dotenv').config();
const fs = require('fs');
const discord = require("discord.js");
const client = new discord.Client();
*/

const letter = [[":zero:","0⃣"],[":one:","1⃣"],[":two:","2⃣"],[":three:","3⃣"],[":four:","4⃣"],[":five:","5⃣"],[":six:","6⃣"],[":seven:","7⃣"],[":eight:","8⃣"],[":nine:","9⃣"],[":keycap_ten:","🔟"],[":regional_indicator_a:","🇦"],[":regional_indicator_b:","🇧"],[":regional_indicator_c:","🇨"],[":regional_indicator_d:","🇩"],[":regional_indicator_e:","🇪"],[":regional_indicator_f:","🇫"],[":regional_indicator_g:","🇬"],[":regional_indicator_h:","🇭"],[":regional_indicator_i:","🇮"],[":regional_indicator_j:","🇯"],[":regional_indicator_k:","🇰"],[":regional_indicator_l:","🇱"],[":regional_indicator_m:","🇲"],[":regional_indicator_n:","🇳"],[":regional_indicator_o:","🇴"],[":regional_indicator_p:","🇵"],[":regional_indicator_q:","🇶"],[":regional_indicator_r:","🇷"],[":regional_indicator_s:","🇸"],[":regional_indicator_t:","🇹"],[":regional_indicator_u:","🇺"],[":regional_indicator_v:","🇻"],[":regional_indicator_w:","🇼"],[":regional_indicator_x:","🇽"],[":regional_indicator_y:","🇾"],[":regional_indicator_z:","🇿"]]


class panelEvent {
    constructor(client,json,roles) {
        this.client = client;
        this.json = json;
        this.roles = roles;
    }

    async panelCreate (message){
        const client = this.client;
        const json = this.json;
        const ROLES = this.roles

        const userRoles = message.member.roles.member._roles;
        const cnd = [" ","現在ON"]

        const msg = await message.channel.send("生成中...")
        if(userRoles.indexOf(ROLES.roles[0][1])>-1){
            var result = 1
        }else result = 0

        var text =(`<@${message.author.id}>\n**サーバー通知機能**\nリアクションを押すことでサーバーの通知を受け取るか選択できます。\n${letter[0][0]} : ${ROLES.roles[0][0]} ${cnd[result]}\n`);
        msg.react(letter[0][1]);

        for(var i=1; i<ROLES.roles.length; i++){
            if(userRoles.indexOf(ROLES.roles[i][1])>-1){
                var result = 1
            }else result = 0
            text = (`${text}${letter[i][0]} : ${ROLES.roles[i][0]} ${cnd[result]}\n`);
            msg.react(letter[i][1]);
        };
        msg.edit(text);
    }
}

module.exports = panelEvent