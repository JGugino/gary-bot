const fs = require('fs');
const path = require('path');

const eventsPath = path.join(__dirname, '..', 'events');
const eventFiles = fs
	.readdirSync(eventsPath)
	.filter((file) => file.endsWith('.js'));

function loadEvents(bot) {
	for (const file of eventFiles) {
		const filePath = path.join(eventsPath, file);
		const event = require(filePath);
		if (event.once) {
			bot.once(event.name, (...args) => event.execute(...args));
		} else {
			bot.on(event.name, (...args) => event.execute(...args));
		}
		console.log(`✅ Loaded event ${file.toString().split('.')[0]}`);
	}
}

module.exports = loadEvents;
