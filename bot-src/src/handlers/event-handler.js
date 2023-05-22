const path = require('path')
const getFiles = require('../utils/get-files');

module.exports = (bot) => {
    const eventFolders = getFiles(path.join(__dirname, '..', 'events'), true);

    for(const folder of eventFolders){
        const eventFiles = getFiles(folder);
        eventFiles.sort((a, b)=>{ a > b })

        const eventName = folder.replace(/\\/g, '/').split('/').pop();
        
        bot.on(eventName, async (args) => {
            for(const file of eventFiles){
                const eventFunction = require(file);
                await eventFunction(bot, args);
            }
        });
    }
}