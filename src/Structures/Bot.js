const { Client, Collection } = require('discord.js');
const Util = require('./Util.js');

module.exports = class Bot extends Client {

	constructor(options = {}) {
		super({
			disableMentions: 'everyone'
		});
		this.validate(options);

		// eslint-disable-next-line semi
		this.commands = new Collection()

		// eslint-disable-next-line semi
		this.aliases = new Collection()

		// eslint-disable-next-line semi
		this.utils = new Util(this)

		this.once('ready', () => {
			console.log(`Logged in as ${this.user.username}`);
		});

		this.on('message', async (message) => {
			const mentionRegex = RegExp(`^<@!${this.user.id}>$`);
			const mentionRegexPrefix = RegExp(`^<@!${this.user.id}> `);

			if (!message.guild || message.author.bot) return;

			if (message.content.match(mentionRegex)) message.channel.send(`My prefix is \`${this.prefix}\``);

			const prefix = message.content.match(mentionRegexPrefix) ?
				message.content.match(mentionRegexPrefix)[0] : this.prefix;

			if (!message.content.startsWith(prefix)) return;

			const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

			const command = this.commands.get(cmd.toLowerCase()) || this.commands.get(this.aliases.get(cmd.toLowerCase()));
			if (command) {
				command.run(message, args);
			}
		});
	}

	validate(options) {
		if (typeof options !== 'object') throw new TypeError('Options should be a type of Object.');

		if (!options.token) throw new Error('You must pass the token for the client.');
		this.token = options.token;

		if (!options.prefix) throw new TypeError('You must pass the prefix for the client.');
		if (typeof options.prefix !== 'string') throw new TypeError('Prefix should be a type of String.');
		this.prefix = options.prefix;
	}

	async start(token = this.token) {
		this.utils.loadCommands();
		super.login(token);
	}

};
