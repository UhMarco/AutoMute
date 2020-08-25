const Command = require('../../Structures/Command');

module.exports = class extends Command {

  constructor(...args) {
		super(...args, {
			aliases: ['s', 'shutdown']
		});
	}

  async run(message, args) {
    if(message.author.id !== this.client.owner) return message.channel.send(`Insufficient permissions! ${message.author.id} : ${this.client.owner}`);

    try {
      await message.channel.send(`Stopping...`);
      process.exit();
    } catch (e) {
      message.channel.send(`ERROR: ${e.message}`)
    }
  }
}
