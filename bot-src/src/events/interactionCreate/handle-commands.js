const getLocalCommands = require("../../utils/get-local-commands");

const { devs, serverID } = require=('../../../config.json');

module.exports = (bot, interaction) => {
    if(!interaction.isChatInputCommand()) return;

    const localCommands = getLocalCommands()

    try{
        const commandObject = localCommands.find(
            (cmd) => cmd.name === interaction.commandName
        );

        if(!commandObject) return;

        if(commandObject.devOnly){
            if(!devs.includes(interaction.member.id)){
                interaction.reply({
                    content: 'This command is for developers only',
                    ephemeral: true
                });
                return;
            }
        }

        if(commandObject.testOnly){
            if(!interaction.guild.id === serverID){
                interaction.reply({
                    content: 'This command can not be ran here',
                    ephemeral: true
                });
                return;
            }
        }

        if(commandObject.permissionsRequired?.length){
            for(const permission of commandObject.permissionsRequired){
                if(!interaction.member.permissions.has(permission)){
                    interaction.reply({
                        content: "You don't have the correct permissions for this commands.",
                        ephemeral: true
                    });
                    break;
                }
            }
        }
    }catch(error){
        console.log(error);
    }
}