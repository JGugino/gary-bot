const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	ButtonBuilder,
	ButtonStyle,
	ActionRowBuilder,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription(
			'Bans the specified user and deletes all messages they sent within the last day.'
		)
		.addUserOption((option) =>
			option.setName('user').setDescription('The user to ban').setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName('reason')
				.setDescription('The reason for the ban')
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),
	async execute(interaction) {
		const target = interaction.options.getUser('user');
		const reason =
			interaction.options.getString('reason') ?? 'No reason was provided';

		const confirmButton = new ButtonBuilder()
			.setCustomId('confirm-button')
			.setLabel('Confirm Ban')
			.setStyle(ButtonStyle.Danger);

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
			content: `Are you sure you want to ban ${target.username} for: "${reason}"?`,
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
				await interaction.guild.members.ban(target, {
					deleteMessageSeconds: 86400,
					reason,
				});

				await confirmation.update({
					content: `${target.username} has been banned for reason: ${reason}`,
					components: [],
				});
			} else if (confirmation.customId === 'cancel-button') {
				await confirmation.update({
					content: 'Ban cancelled ❌',
					components: [],
				});
			}
		} catch (error) {
			await interaction.editReply({
				content: 'Interation timed out, cancelling, cancelling ❌',
				components: [],
			});
		}
	},
	cooldown: 60,
	global: true,
};
