const Command = require('../../Structures/Command');
const f = require('../../Structures/Functions');

module.exports = class extends Command {

  constructor(...args) {
		super(...args, {
			aliases: ['del', 'rem']
		});
	}

  async run(message, ...input) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You must be an administrator to do this.");

    const file = f.loadJSON(`${message.guild.id}.json`);
    if (!file) {
      return message.channel.send("There are no filters set for this server.");
    }

    let phrases = file.phrases;

    var actionTaken = false;

    phrases.forEach(phrase => {
        if (input == phrase) {
          phrases.splice(phrases.indexOf(phrase), 1);
          actionTaken = true;
        }
    });

    if (!actionTaken) return message.channel.send(`"${input}" is not filtered.`)

    if (phrases.length == 0) {
      f.deleteJSON(message);
    } else {
      f.editJSON(message, file);
    }
    message.channel.send(`Removed "${input}" from the chat filter.`);

  }
}
