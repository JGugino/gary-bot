const mickeyArt = require('../../art/mickey-art');

module.exports = {
    name: 'mickey',
    description: 'Prints a Mickey Mouse head in acsii.',
    //devOnly: boolean,
    //testOnly: boolean,
    //options: Object[],
    callback: (bot, interaction) => {
        interaction.reply(mickeyArt);
    }
}