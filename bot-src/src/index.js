require('dotenv').config();

const loadCommands = require('./utils/load_commands');
const loadEvents = require('./utils/load_events');

const { Client, Collection, GatewayIntentBits } = require('discord.js');

const botToken = process.env.BOT_TOKEN;

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

bot.commands = new Collection();
bot.cooldowns = new Collection();

loadCommands(bot);
loadEvents(bot);

bot.login(botToken);
