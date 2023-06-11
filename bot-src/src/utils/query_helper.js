const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function isMickey(interaction, user) {
	try {
		const foundMickey = await prisma.mickey.findFirst({
			where: { userID: user.id },
		});

		console.log(foundMickey);

		return foundMickey ? true : false;
	} catch (error) {
		resolveError(error, interaction);
	}
}

async function setMickey(interaction, user) {
	try {
		const currentlyMickey = await isMickey(interaction, user);

		if (currentlyMickey) {
			interaction.reply({
				content: `${user.username} is already set to mickey mouse.`,
				ephemeral: true,
			});
			return;
		}

		await prisma.mickey.create({
			data: {
				userID: user.id,
				user: user.username,
			},
		});

		interaction.reply({
			content: `${user.username} has been set as Mickey Mouse`,
			ephemeral: true,
		});
	} catch (error) {
		resolveError(error, interaction);
	}
}

async function removeMickey(interaction, user) {
	try {
		const currentlyMickey = await isMickey(interaction, user);

		if (!currentlyMickey) {
			interaction.reply({
				content: `${user.username} isn't set to Mickey Mouse.`,
				ephemeral: true,
			});
			return;
		}

		const found = await getMickeyRecordIDFromUserID(interaction, user.id);

		await prisma.mickey.delete({
			where: { id: found },
		});

		interaction.reply({
			content: `${user.username} has been removed from Mickey Mouse`,
			ephemeral: true,
		});
	} catch (error) {
		resolveError(error, interaction);
	}
}

async function getMickeyRecordIDFromUserID(interaction, userID) {
	try {
		const foundMickey = await prisma.mickey.findFirst({
			where: { userID: userID },
		});

		return foundMickey ? foundMickey.id : null;
	} catch (error) {
		resolveError(error, interaction);
	}
}

function resolveError(error, interaction) {
	console.log("An error has occurred.", error);
	interaction.reply({
		content: `An error has occurred, please try again.`,
		ephemeral: true,
	});
}

module.exports = {
	setMickey,
	removeMickey,
	isMickey,
	getMickeyRecordIDFromUserID,
};
