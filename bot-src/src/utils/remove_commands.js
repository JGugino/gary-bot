require('dotenv').config();

const { REST, Routes } = require('discord.js');

const botToken = process.env.BOT_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const rest = new REST().setToken(botToken);

rest
	.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
	.then(() => console.log('✅ Successfully deleted all guild commands.'))
	.catch(console.error);

rest
	.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('✅ Successfully deleted all application commands.'))
	.catch(console.error);
