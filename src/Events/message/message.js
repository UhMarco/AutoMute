const Event = require('../../Structures/Event');
const fs = require('fs');

function loadJSON(filename = '') {
  file = __dirname + `/../../Data/${filename}`;
  return JSON.parse(
    fs.existsSync(file) ? fs.readFileSync(file).toString() : null
  )
}

module.exports = class extends Event {

  async run(message) {
    // FILTER
    const file = loadJSON(`${message.guild.id}.json`);
    if (file) {
      file.phrases.forEach(phrase => {
        if (message.content.toLowerCase().includes(phrase)) return message.delete();
      });
    }

    // CONTINUE
    const mentionRegex = RegExp(`^<@!${this.client.user.id}>$`);
    const mentionRegexPrefix = RegExp(`^<@!${this.client.user.id}> `);

    if (!message.guild || message.author.bot) return;

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
