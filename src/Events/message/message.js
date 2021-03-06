const Event = require('../../Structures/Event');
const f = require('../../Structures/Functions');

module.exports = class extends Event {

  async run(message) {

    // IGNORE DMS AND BOTS
    if (!message.guild || message.author.bot) return;

    // FILTER
    const file = f.loadJSON(`${message.guild.id}.json`);
    if (file && message.member.hasPermission("ADMINISTRATOR")) { // REMEMBER TO ADD ! INFRONT
      file.phrases.forEach(phrase => {
        if (message.content.toLowerCase().includes(phrase)) {
          message.delete();
          let x = f.violation(message);
          if (x) {
            message.channel.send(`<@${message.author.id}> - filtered word violation. Violation limit reached. Punishing...`);
            let role = message.guild.roles.cache.find(role => role.name === "muted");
            if (role) {
              message.guild.member(message.author).roles.add(role);
            } else {
              message.channel.send('No role name "muted".');
            }
            return;
          }
          return message.channel.send(`<@${message.author.id}> - filtered word violation.`);
        }
      });
    }

    // CONTINUE
    const mentionRegex = RegExp(`^<@!${this.client.user.id}>$`);
    const mentionRegexPrefix = RegExp(`^<@!${this.client.user.id}> `);

    if (message.content.match(mentionRegex)) message.channel.send(`My prefix is \`${this.client.prefix}\``);

    const prefix = message.content.match(mentionRegexPrefix) ?
      message.content.match(mentionRegexPrefix)[0] : this.client.prefix;

    if (!message.content.startsWith(prefix)) return;

    const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

    const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
    if (command) {
      command.run(message, args);
    }
  }

}
