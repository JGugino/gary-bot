require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const bot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

bot.on('ready', (client) => {
    console.log(`🐌 ${client.user.tag.slice(0, client.user.tag.indexOf('#'))} has initialized, please add water for continuous operation...`);
});

bot.on('messageCreate', (msg) => {
    const messageContents = msg.content;
    const messageSender = msg.author;
    
    if(!messageSender.bot){
        msg.reply('Who is talking... please stop...')
    }
})

bot.login(process.env.BOT_TOKEN);