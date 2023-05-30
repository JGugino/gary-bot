const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(activeBot) {
		console.log(`${activeBot.user.tag.split('#')[0]} has been activated! 🐌`);
	},
};
