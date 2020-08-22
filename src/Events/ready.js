const Event = require('../Structures/Event');

module.exports = class extends Event {

  constructor(...args) {
    super(...args, {
      once: true
    });
  }

  run() {
    console.log([
      `Logged in as ${this.client.user.tag}`,
      `Prefix is ${this.client.prefix}`,
      `Owner's ID is ${this.client.owner}`,
      `Loaded ${this.client.commands.size} commands.`,
      `Loaded ${this.client.events.size} events.`
    ].join('\n'));
  }
}
