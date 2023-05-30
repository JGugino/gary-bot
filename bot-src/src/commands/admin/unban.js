const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	ButtonBuilder,
	ButtonStyle,
	ActionRowBuilder,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Unbans the specified user.')
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription('The user to unban')
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),
	async execute(interaction) {
		const target = interaction.options.getUser('user');

		const confirmButton = new ButtonBuilder()
			.setCustomId('confirm-button')
			.setLabel('Confirm Unban')
			.setStyle(ButtonStyle.Primary);

		const cancelButton = new ButtonBuilder()
			.setCustomId('cancel-button')
			.setLabel('Cancel')
			.setEmoji('❌')
			.setStyle(ButtonStyle.Secondary);

		const row = new ActionRowBuilder().addComponents(
			cancelButton,
			confirmButton
		);

		const response = await interaction.reply({
			content: `Are you sure you want to unban ${target.username}?`,
			components: [row],
			ephemeral: true,
		});

		const collectorFilter = (i) => i.user.id === interaction.user.id;

		try {
			const confirmation = await response.awaitMessageComponent({
				filter: collectorFilter,
				time: 60000,
			});

			if (confirmation.customId === 'confirm-button') {
				await interaction.guild.members.unban(target);

				await confirmation.update({
					content: `${target.username} has been unban`,
					components: [],
				});
			} else if (confirmation.customId === 'cancel-button') {
				await confirmation.update({
					content: 'Unban cancelled ❌',
					components: [],
				});
			}
		} catch (error) {
			await interaction.editReply({
				content: 'Interation timed out, cancelling ❌',
				components: [],
			});
		}
	},
	cooldown: 60,
	global: true,
};
