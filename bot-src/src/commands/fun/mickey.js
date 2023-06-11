const { SlashCommandBuilder } = require("discord.js");
const { setMickey, removeMickey } = require("../../utils/query_helper");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mickey")
		.setDescription("Marks someone as mickey mouse until removed")
		.addUserOption((option) =>
			option
				.setName("user")
				.setDescription("The user to set as mickey mouse")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("status")
				.setDescription("Are you enabling or disabling?")
				.setRequired(true)
				.addChoices(
					{ name: "Enable", value: "enable" },
					{ name: "Disable", value: "disable" }
				)
		),
	async execute(interaction) {
		const user = interaction.options.getUser("user");
		const status = interaction.options.getString("status");

		// TODO: Add message accents when user is set to mickey mouse mode.

		try {
			if (status == "enable") {
				await setMickey(interaction, user);
			} else if (status == "disable") {
				await removeMickey(interaction, user);
			}
		} catch (error) {
			console.log("An error has occurred while creating db record.", error);
			interaction.reply({
				content: `An error has occurred, please try again.`,
				ephemeral: true,
			});
		}
	},
	cooldown: 5,
};
