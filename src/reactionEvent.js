/*

created by huda0209
announce role bot for discord bot 

main.js :MAIN  'MAIN CODE'
 -msgEvent.js :CLASS
 -panel.js  :CLASS
 -reactionEvent.js  :CLASS　<= this
 -role.js  :CLASS
 -help.js  :CLASS
 
ran by node.js

2020-10-4

*/


const letter = [[":zero:","0⃣"],[":one:","1⃣"],[":two:","2⃣"],[":three:","3⃣"],[":four:","4⃣"],[":five:","5⃣"],[":six:","6⃣"],[":seven:","7⃣"],[":eight:","8⃣"],[":nine:","9⃣"],[":keycap_ten:","🔟"],[":regional_indicator_a:","🇦"],[":regional_indicator_b:","🇧"],[":regional_indicator_c:","🇨"],[":regional_indicator_d:","🇩"],[":regional_indicator_e:","🇪"],[":regional_indicator_f:","🇫"],[":regional_indicator_g:","🇬"],[":regional_indicator_h:","🇭"],[":regional_indicator_i:","🇮"],[":regional_indicator_j:","🇯"],[":regional_indicator_k:","🇰"],[":regional_indicator_l:","🇱"],[":regional_indicator_m:","🇲"],[":regional_indicator_n:","🇳"],[":regional_indicator_o:","🇴"],[":regional_indicator_p:","🇵"],[":regional_indicator_q:","🇶"],[":regional_indicator_r:","🇷"],[":regional_indicator_s:","🇸"],[":regional_indicator_t:","🇹"],[":regional_indicator_u:","🇺"],[":regional_indicator_v:","🇻"],[":regional_indicator_w:","🇼"],[":regional_indicator_x:","🇽"],[":regional_indicator_y:","🇾"],[":regional_indicator_z:","🇿"]];

class reactionEvent {
    constructor(client,guildData) {
        this.client = client;
        this.json = guildData.guild;
        this.roles = guildData.roles;
    }

    async addrole (messageReaction ,user){
        const client = this.client;
        const json = this.json;;
        const ROLES = this.roles;

        let emoji = [];
        for(let i=0; i<letter.length; i++){
            emoji.push(letter[i][1])};

        if(messageReaction.message.author.id === client.user.id){
            const Id = emoji.indexOf(messageReaction.emoji.name);
            if(Id === -1 && Id < ROLES.length) return;
            const member = await client.guilds.cache.get(json.GuildId).members.cache.get(user.id);
            let userRoles = member.roles.member._roles;
            if(userRoles.indexOf(ROLES[Id][1]) === -1){
                member.roles.add(ROLES[Id][1]);
                userRoles.push(ROLES[Id][1]);
            }else{
                member.roles.remove(ROLES[Id][1]);
                delete userRoles[userRoles.indexOf(ROLES[Id][1])]};

            messageReaction.message.reactions.cache.get(letter[Id][1]).users.remove(user.id);
            if(messageReaction.message.mentions.members.first().id === user.id){
                let text =(`<@${user.id}>\n**サーバー通知機能**\nリアクションを押すことでサーバーの通知を受け取るか選択できます。\n`);
                for(let I=0; I<ROLES.length; I++){
                    let result = userRoles.indexOf(ROLES[I][1])>-1 ? "現在on" :"";
                    text = (`${text}${letter[I][0]} : ${ROLES[I][0]} ${result}\n`);
                };
                messageReaction.message.edit(text);
            };
        }
    }
}

module.exports = reactionEvent