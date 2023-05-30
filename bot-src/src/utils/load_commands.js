const fs = require('fs');
const path = require('path');

const foldersPath = path.join(__dirname, '..', 'commands');
const commandFolders = fs.readdirSync(foldersPath);

function loadCommands(bot) {
	for (const folder of commandFolders) {
		const commandPath = path.join(foldersPath, folder);
		const commandFiles = fs
			.readdirSync(commandPath)
			.filter((file) => file.endsWith('.js'));

		for (const file of commandFiles) {
			const filePath = path.join(commandPath, file);
			const command = require(filePath);

			if ('data' in command && 'execute' in command) {
				bot.commands.set(command.data.name, command);
				console.log(`✅ The command ${command.data.name} has been loaded.`);
			} else {
				console.log(
					`⚠️ The command at ${filePath} is missing a required "data" or "execute" property.`
				);
			}
		}
	}
}

module.exports = loadCommands;
