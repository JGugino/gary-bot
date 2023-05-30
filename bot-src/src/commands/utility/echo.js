const { SlashCommandBuilder } = require('discord.js');

// TODO: finish this lol

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Echos your specified input')
		.addStringOption((option) =>
			option
				.setName('input')
				.setDescription('The text you wish to echo')
				.setRequired(true)
		)
		.addChannelOption((option) =>
			option
				.setName('channel')
				.setDescription('The channel you wish to echo into')
		),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
	cooldown: 5,
};
