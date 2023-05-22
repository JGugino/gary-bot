require('dotenv').config();
const { REST, Routes } = require('discord.js');

const commands = [
    {
        name: 'mickey',
        description: 'Prints out an ascii art of mickey mouse'
    }
]

const rest = new REST({ version: 10 }).setToken(process.env.BOT_TOKEN);

(async () => {
    try{
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(process.env.BOT_ID, process.env.GUILD_ID),
            { body: commands }
        );

        console.log('Slash commands registered...');
    }catch(error){
        console.log(error);
    }
})();