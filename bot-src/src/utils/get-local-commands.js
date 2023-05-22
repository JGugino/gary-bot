const path = require('path');
const getFiles = require('./get-files');

module.exports = (expections = []) => {
    let localCommands = []

    const commandCategories = getFiles(path.join(__dirname, '..', 'commands'), true);

    for(const category of commandCategories){
        const files = getFiles(category);

        for(const file of files){
            const commandObject = require(file);

            if(expections.includes(commandObject.name)){
                continue;
            }

            localCommands.push(commandObject);
        }
    }

    return localCommands;
}