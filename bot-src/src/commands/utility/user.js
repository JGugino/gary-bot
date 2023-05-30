const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
		await interaction.reply({
			content: `The current user is ${interaction.user.username}, and they joined on ${interaction.member.joinedAt}.`,
			ephemeral: true,
		});
	},
	global: true,
	cooldown: 5,
};
