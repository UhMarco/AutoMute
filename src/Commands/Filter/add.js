const Command = require('../../Structures/Command');
const f = require('../../Structures/Functions');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['include']
		});
	}

	async run(message, ...input) {
		if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You must be an administrator to do this.");

		if (input[0].length == 0) return message.channel.send('Please enter desired phrase to filter.');

		let file = f.loadJSON(`${message.guild.id}.json`);

		if (!file) {
			file = f.createJSON(message);
		}

		var phrases = file.phrases

		input.join(' ');

		var BreakException = {};

		try {
			phrases.forEach(phrase => {
				if (phrase == input) {
					message.channel.send('That phrase is already filtered.');
					throw BreakException;
				}
			});
		} catch (e) {
			if (e !== BreakException) throw e;
			else return;
		}

		phrases.push(input.toString());

		f.editJSON(message, file);
		message.channel.send(`Added \`${input}\` to the chat filter.`);

	}

};
