const Command = require('../../Structures/Command');
const ms = require('ms');

module.exports = class extends Command {

  constructor(...args) {
		super(...args, {
			aliases: ['stats']
		});
	}

  async run(message) {
    message.channel.send(`I've been online for \`${ms(this.client.uptime, { long: true })}\``);
  }
}
