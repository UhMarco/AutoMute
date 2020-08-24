const Command = require('../../Structures/Command');
const f = require('../../Structures/Functions');

module.exports = class extends Command {

  constructor(...args) {
		super(...args, {
			aliases: ['view', 'list']
		});
	}

  async run(message) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You must be an administrator to do this.");

    const file = f.loadJSON(`${message.guild.id}.json`);

    let str = [];

    if (file) {
      file.phrases.forEach(phrase => {
        str.push(phrase);
      });
      message.channel.send(str.join(', '));
    } else {
      message.channel.send('There are no filters set for this server.');
    }
  }
}
