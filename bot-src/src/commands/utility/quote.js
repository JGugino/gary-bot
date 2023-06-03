const { SlashCommandBuilder, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('quote')
		.setDescription("Quotes the specified user and adds it to a 'quotes' channel.")
		.addUserOption((option) => option.setName('user').setDescription('The user you wish to quote.').setRequired(true))
		.addStringOption((option) =>
			option
				.setName('quote')
				.setDescription('The quote')
				.setRequired(true)
		),
	async execute(interaction) {
		const generalChannel = interaction.member.guild.channels.client.channels.cache.filter(channel => channel.name === 'general').first();
		let quotesChannel = interaction.member.guild.channels.client.channels.cache.filter(channel => channel.name === 'quotes').first();

		if (!quotesChannel) {
			console.log(`ℹ No quotes channel found in guild, creating one...`);

			quotesChannel = await interaction.member.guild.channels.create({
				name: 'quotes',
				type: ChannelType.GuildText,
				parent: generalChannel.parent
			});
		}

		const user = interaction.options.getUser('user');
		const quote = interaction.options.getString('quote');

		const quoteEmbed = new EmbedBuilder()
			.setAuthor({ name: user.username, iconURL: user.displayAvatarURL() })
			.setTitle(`"${quote}"`)
			.setColor('Random')
			.setFooter({ text: `Quoted by: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() });

		quotesChannel.send({ embeds: [quoteEmbed] });


		interaction.reply({
			content: `Quote created`,
			ephemeral: true,
		});
	},
	global: true,
	cooldown: 120,
};
