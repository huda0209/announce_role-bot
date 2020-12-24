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

2020-12-25

*/

const roleEmoji = require('./roleEmoji')

const letter = [[":zero:","0⃣"],[":one:","1⃣"],[":two:","2⃣"],[":three:","3⃣"],[":four:","4⃣"],[":five:","5⃣"],[":six:","6⃣"],[":seven:","7⃣"],[":eight:","8⃣"],[":nine:","9⃣"],[":keycap_ten:","🔟"],[":regional_indicator_a:","🇦"],[":regional_indicator_b:","🇧"],[":regional_indicator_c:","🇨"],[":regional_indicator_d:","🇩"],[":regional_indicator_e:","🇪"],[":regional_indicator_f:","🇫"],[":regional_indicator_g:","🇬"],[":regional_indicator_h:","🇭"],[":regional_indicator_i:","🇮"],[":regional_indicator_j:","🇯"],[":regional_indicator_k:","🇰"],[":regional_indicator_l:","🇱"],[":regional_indicator_m:","🇲"],[":regional_indicator_n:","🇳"],[":regional_indicator_o:","🇴"],[":regional_indicator_p:","🇵"],[":regional_indicator_q:","🇶"],[":regional_indicator_r:","🇷"],[":regional_indicator_s:","🇸"],[":regional_indicator_t:","🇹"],[":regional_indicator_u:","🇺"],[":regional_indicator_v:","🇻"],[":regional_indicator_w:","🇼"],[":regional_indicator_x:","🇽"],[":regional_indicator_y:","🇾"],[":regional_indicator_z:","🇿"]];

const roleManeger = async function (messageReaction ,user, guildData,client){

    const guild = await client.guilds.cache.get(guildData.guild.GuildId);
    const roles = roleEmoji.roleEmojiSet(guild, guildData);

    console.log(await isDafaultEmoji(messageReaction,guildData,client));

    let roleId=[];
    let Id;
    if(await isDafaultEmoji(messageReaction,guildData,client)){
        for(let i=0;i<roles.length;i++){
            roleId.push(roles[i][3][1]);
        }
        Id = roleId.indexOf(messageReaction._emoji.name);
        console.log(roleId.indexOf(messageReaction._emoji.name));
    }else{
        for(let i=0;i<roles.length;i++){
            roleId.push(roles[i][3][1].id);
        }
        Id = roleId.indexOf(messageReaction._emoji.id);
    }


    if(messageReaction.message.author.id === client.user.id){
        //const Id = roleId.indexOf(messageReaction.emoji.name);
        if(Id === -1 && Id < guildData.roles.length) return;
        const member = await client.guilds.cache.get(guildData.guild.GuildId).members.cache.get(user.id);
        let userRoles = member.roles.member._roles;

        if(userRoles.indexOf(guildData.roles[Id][1]) === -1){
            member.roles.add(guildData.roles[Id][1]);
            userRoles.push(guildData.roles[Id][1]);
        }else{
            member.roles.remove(guildData.roles[Id][1]);
            delete userRoles[userRoles.indexOf(guildData.roles[Id][1])]
        };

        //デフォルト絵文字はそのまま カスタム絵文字はidをいれる
        messageReaction.message.reactions.cache.get(roles[Id][3][1]).users.remove(user.id);


        if(messageReaction.message.mentions.members.first().id === user.id){
            let text =(`<@${user.id}>\n**サーバー通知機能**\nリアクションを押すことでサーバーの通知を受け取るか選択できます。\n`);
            for(let I=0; I<guildData.roles.length; I++){
                let result = userRoles.indexOf(guildData.roles[I][1])>-1 ? "現在on" :"";
                text = (`${text}${letter[I][0]} : ${guildData.roles[I][0]} ${result}\n`);
            };
            messageReaction.message.edit(text);
        };
    }
}

async function isDafaultEmoji(messageReaction,guildData,client){
    const emojiDataArray = await client.guilds.cache.get(guildData.guild.GuildId).emojis.cache.array();
    let emojiArray =[]
    for(let i=0;i<emojiDataArray.length;i++){
        emojiArray.push(emojiDataArray[i].id)
    }
    if(messageReaction.emoji.name.length==2 && !messageReaction.emoji.id){
        //デフォルト絵文字は文字列の長さが2文字 またidがない
        return true;
    }else if(emojiArray.indexOf(messageReaction._emoji.id)>-1){
        //カスタム絵文字のidがギルドの絵文字リストのidにあるか確認
        return false;
    }
}

exports.roleManeger = roleManeger