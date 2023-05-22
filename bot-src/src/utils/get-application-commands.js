module.exports = async (bot, guildID) => {
    let applicationCommands;

    if(guildID){
        const guild = bot.guilds.fetch(guildID);
        applicationCommands = guild.commands;
    }else{
        applicationCommands = await bot.application.commands;
    }

    await applicationCommands.fetch();
    return applicationCommands;
}