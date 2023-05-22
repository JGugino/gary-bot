module.exports = {
    name: 'ping',
    description: 'Pong!',
    //devOnly: boolean,
    //testOnly: boolean,
    //options: Object[],
    callback: (bot, interaction) => {
        interaction.reply(`Pong - ${bot.ws.ping}`);
    }
}