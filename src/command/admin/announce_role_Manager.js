/*

created by huda0209
announce role bot for discord bot 

main.js :MAIN  'MAIN CODE'
 -command-handler.js :module
 -panel.js  :module
 -reactionEvent.js  :module
 -announceRole.js  :module
 -help.js  :module
 -admin.js  :module
 -announce_role_Manager.js  :module　<= this
 
ran by node.js

2020-12-12

*/

const fs = require('fs');
const logger = require('../../util/logger');
const main = require('../../../main');

const arm_command_handler = function ([command, ...args], message, guildData, BOT_DATA, client) {
	const role_name = args[2];
	if (role_name == undefined) return message.channel.send("引数が足りません。");

	switch (args[1].toLowerCase()) {
		case "add":
			role_Create(message, guildData, role_name, [command, ...args]);
			break;

		case "delete":
		case "del":
			role_Delete(message, guildData, role_name);
			break;

		default:
			message.channel.send("不明なコマンドです。")
	}
}

const role_Create = async function (message, guildData, role_name, [command, ...args]) {
	const colorId = args[3]==undefined ? "000000" : args[3].startsWith('#') ? args[3].slice(1) : args[3];
	if (!isColorCode(colorId)) return message.channel.send("カラーコードが不正です。");

	const EmojiID = getEmoji(message,args[4])

	const role = await message.guild.roles.create({
		data: {
			name: role_name,
			permissions: 0,
			color: colorId
		}
	});
	const position = guildData.roles.length==0 ? 1 : ((await message.guild.roles.fetch(guildData.roles[guildData.roles.length - 1][1])).position-1);
	await (await message.guild.roles.fetch(role.id)).setPosition(position);
	guildData.roles.push([role_name, role.id, EmojiID]);
	fs.writeFileSync('./config/guild/guild.json', JSON.stringify(guildData, null, "\t"), 'utf8');
	main.configReload("get");
	message.channel.send(`${role.name}を作成しました。`);
	logger.info(`created new role {green}${role.name}`);
}

const role_Delete = async function (message, guildData, role_name) {
	let roleList = [];
	for (let i = 0; i < guildData.roles.length; i++) {
		roleList.push(guildData.roles[i][0]);
	};
	const roleId = roleList.indexOf(role_name);
	if (roleId == -1) return message.channel.send(`指定されたロールはありません。`);
	await (await message.guild.roles.fetch(guildData.roles[roleId][1])).delete();
	delete guildData.roles[roleId];
	guildData.roles = guildData.roles.filter(Boolean);
	fs.writeFileSync('./config/guild/guild.json', JSON.stringify(guildData, null, "\t"), 'utf8');
	main.configReload("get");
	message.channel.send(`${role_name}を削除しました。`);
	logger.info(`deleted role {red}${role_name}`);
}

function isColorCode(colorCode) {
	colorCode = colorCode.toLowerCase();
	if (colorCode.length != 3 && colorCode.length != 6) return false;
	if (isNaN(parseInt(colorCode, 16))) return false;
	let hex = parseInt(colorCode, 16).toString(16).toLowerCase();
	while (hex.length < colorCode.length) {
		hex = "0" + hex;
	};
	if (hex != colorCode) return false;
	return true;
}

function getEmoji(message,emojiTxt){
	if(emojiTxt == undefined) return null;
	if(emojiTxt.length < 19) return null; 
	//twimojiは常に2文字になる(みたい) 独自絵文字はidで18字あるので19以下なら誤作動はないはず
	let emojiId = emojiTxt.slice(emojiTxt.length-19, emojiTxt.length-1);
	
	const emojiDataArray = message.guild.emojis.cache.array();
	let emojiArray= [];
	for(let i=0;i<emojiDataArray.length;i++){
		emojiArray.push(emojiDataArray[i].id);
	}

	if(emojiArray.indexOf(emojiId)==-1) return null;
	return emojiId;
}

exports.arm_command_handler = arm_command_handler