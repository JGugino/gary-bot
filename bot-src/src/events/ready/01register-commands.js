const { serverName } = require('../../../config.json');
const getApplicationCommands = require('../../utils/get-application-commands');
const getLocalCommands = require('../../utils/get-local-commands');
const areCommandsDifferent = require('../../utils/are-commands-different');

module.exports = async (bot) => {
    try{
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(bot, serverName);

        for(const localCommand of localCommands){
            const { name, description, options } = localCommand;

            const exisitingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === name
            );

            if(exisitingCommand){
                if(localCommand.deleted){
                    await applicationCommands.delete();
                    console.log(`🗑️ Command ${name} has been deleted.`);
                    continue;
                }

                if(areCommandsDifferent(exisitingCommand, localCommand)){
                    await applicationCommands.edit(exisitingCommand.id, {
                        description, options
                    });
                    console.log(`📝 Command ${name} has been edited.`);
                }
            } else {
                if(localCommand.deleted){
                    console.log(`⏭️ Skipping command ${name}, set to be deleted`);
                    continue;
                }

                await applicationCommands.create({
                    name,
                    description,
                    options
                });

                console.log(`✅ Command ${name} registered`);
            }      
        }
    }catch(error){
        console.log(error);
    }
}