const Command = require('../../Structures/Command');
const f = require('../../Structures/Functions');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['limit']
		});
	}

  async run(message, ...input) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You must be an administrator to do this.");

    let file = f.loadJSON(`${message.guild.id}.json`);
    if (!file) {
      return message.channel.send("There are no filters set for this server.");
    }

    let value = parseInt(input[0])
    if (isNaN(value)) {
      return message.channel.send("Limit must be an int.");
    }

    file.limit = value;

    f.editJSON(message, file)
    message.channel.send(`Violation limit set to \`${value}\`.`);

  }
}
