const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mickey')
		.setDescription(
			'Marks someone as mickey mouse for a set amount of time, or until removed'
		)
		.addStringOption((option) =>
			option
				.setName('user')
				.setDescription('The user to set as mickey mouse')
				.setRequired(true)
		),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
	cooldown: 5,
};
