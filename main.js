/*

created by huda0209
announce role bot for discord bot 

main.js :MAIN  'MAIN CODE'　<= this
 -command-handler.js :module
 -panel.js  :module
 -reactionEvent.js  :module
 -announceRole.js  :module
 -help.js  :module
 -admin.js  :module
 -announce_role_Manager.js  :module
 
ran by node.js

2020-12-12

*/

//node.js modules
const fs = require('fs');
const discord = require("discord.js");

//class
const commandHandler = require('./src/command-handler.js');
const reactionEvent = require('./src/reactionEvent.js');

//config
let guildData = JSON.parse(fs.readFileSync('./config/guild/guild.json', 'utf8'));
const BOT_DATA = JSON.parse(fs.readFileSync('./config/setting.json', 'utf8'));

//other 
const option = { ws: { intents: discord.Intents.ALL }, restTimeOffset: 10 };
const client = new discord.Client(option);
const logger = require('./src/util/logger');
const configChecker = require('./src/util/config');


//start the bot
client.on("ready", message => {
	logger.info(`bot is ready! ver. ${BOT_DATA.VERSION} \n        login: {cyan}${client.user.tag}\n`);
	client.user.setActivity(`${BOT_DATA.PREFIX}helpでヘルプを表示 ver. ${BOT_DATA.VERSION}`, { type: 'PLAYING' });
});

//when bot join the guild, this event will load
client.on("guildCreate", bot => {
	guildData.guild = {
		"GuildId": bot.id,
		"Owner": bot.ownerID,
		"Admin": []
	};
	fs.writeFileSync('./config/guild/guild.json', JSON.stringify(guildData, null, "\t"), 'utf8');
	logger.info(`guildCreate catch`);
})

//message event
client.on("message", async message => {
	if (message.content.startsWith(BOT_DATA.PREFIX)) {
		const [command, ...args] = message.content.slice(BOT_DATA.PREFIX.length).split(' ');
		commandHandler.commandHandler([command, ...args], message, guildData, BOT_DATA, client);
	};
})

client.on("messageReactionAdd", async (messageReaction, user) => {
	if (user.bot) return;
	reactionEvent.roleManeger(messageReaction, user, guildData, client);
})

exports.configReload = function (cmd, newguildData) {
	switch (cmd.toLowerCase()) {
		case "get":
			guildData = require('./config/guild/guild.json');
			break;
		case "set":
			guildData = newguildData;
			break;
	};
}


configChecker.check(BOT_DATA);
let token;
if (process.argv.length >= 3) {
	switch (process.argv[2]) {
		case "main":
			token = BOT_DATA.MAIN_TOKEN;
			break;
		case "div":
			configChecker.divCheck(BOT_DATA);
			token = BOT_DATA.DIV_TOKEN;
			BOT_DATA.VERSION = `dev(${BOT_DATA.VERSION})`;
			break;
		default:
			logger.error(`Unknown command. \nUsage \n {green}node main.js main{reset} : use main token \n {green}node main.js div{reset} : use divelopment token`);
			process.exit(0);
	};
} else token = BOT_DATA.MAIN_TOKEN;
client.login(token);