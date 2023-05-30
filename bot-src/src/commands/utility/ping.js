const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription("Replies to with a bot's ping!"),
	async execute(interaction) {
		const sent = await interaction.reply({
			content: 'Pinging...',
			fetchReply: true,
			ephemeral: true,
		});
		interaction.editReply(
			`Websocket Heartbeat: ${
				interaction.client.ws.ping
			}ms - Roundtrip latency: ${
				sent.createdTimestamp - interaction.createdTimestamp
			}ms`
		);
	},
	global: true,
	cooldown: 20,
};
