/*

created by huda0209
announce role bot for discord bot 

main.js :MAIN  'MAIN CODE'
 -command-handler.js :module
 -panel.js  :module　<= this
 -reactionEvent.js  :module
 -announceRole.js  :module
 -help.js  :module
 -admin.js  :module
 -announce_role_Manager.js  :module
 -roleEmoji.js  :module

ran by node.js

2020-12-24

*/
const roleEmoji = require('../roleEmoji')

const letter = [[":zero:","0⃣"],[":one:","1⃣"],[":two:","2⃣"],[":three:","3⃣"],[":four:","4⃣"],[":five:","5⃣"],[":six:","6⃣"],[":seven:","7⃣"],[":eight:","8⃣"],[":nine:","9⃣"],[":keycap_ten:","🔟"],[":regional_indicator_a:","🇦"],[":regional_indicator_b:","🇧"],[":regional_indicator_c:","🇨"],[":regional_indicator_d:","🇩"],[":regional_indicator_e:","🇪"],[":regional_indicator_f:","🇫"],[":regional_indicator_g:","🇬"],[":regional_indicator_h:","🇭"],[":regional_indicator_i:","🇮"],[":regional_indicator_j:","🇯"],[":regional_indicator_k:","🇰"],[":regional_indicator_l:","🇱"],[":regional_indicator_m:","🇲"],[":regional_indicator_n:","🇳"],[":regional_indicator_o:","🇴"],[":regional_indicator_p:","🇵"],[":regional_indicator_q:","🇶"],[":regional_indicator_r:","🇷"],[":regional_indicator_s:","🇸"],[":regional_indicator_t:","🇹"],[":regional_indicator_u:","🇺"],[":regional_indicator_v:","🇻"],[":regional_indicator_w:","🇼"],[":regional_indicator_x:","🇽"],[":regional_indicator_y:","🇾"],[":regional_indicator_z:","🇿"]]


const panelCreate = async function (message,GuildData){
    const msg = await message.channel.send("生成中...");
    let text =(`<@${message.author.id}>\n**${GuildData.content.function_name}**\n${GuildData.content.panel_content}\n`);

    const roleList = roleEmoji.roleEmojiSet(message,GuildData);

    for(let i=0; i<GuildData.roles.length; i++){
        let result = message.member.roles.member._roles.indexOf(GuildData.roles[i][1])>-1 ? "現在on" :"";
        text = (`${text}${roleList[i][3][0]} : ${GuildData.roles[i][0]} ${result}\n`);
        msg.react(roleList[i][3][1]);
    };
    msg.edit(text);
};


exports.panelCreate = panelCreate