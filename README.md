# ChatFilter
## What is it?
A discord bot that makes the lives of server moderators a little easier with a customizable chat filter and auto muting capabilities. Moderators can sit and watch chat fly past, scanning for anyone being inappropriate and it's not a lot of fun. This bot will pick out the more obvious rule violations such as spam and excessive pinging and will mute the user after a specified amount of offenses, this is off by default. Warning: this is my first discord.js bot and it's ugly.

## How do I use it?
### Usage
You must have server administrator permissions to use commands.
- To view all commands do `cf help`
- To view all phrases in the filter do `cf list`
- To add a phrase do `cf add <phrase>`
- To remove a phrase do `cf del <phrase>`

By default, the bot will not mute for a chat violation, however it can after a specified amount of offenses. When I say mute, I mean giving a user a role called `muted` if it already exists. </br>
- To change the number of offenses before muting do `cf automute <number>`
- Set to `0` for off

Once invited, the bot will always be reading through new messages in all channels it has access to. If you'd like to change which channels the bot is looking in, that's a shame: I don't want to code that. You may restrict the bot's access via to that channel via discord permissions and the problem is solved: you may now swear amongst yourself in the staff channels. Administrators' messages are always ignored.

### Cloning
Clone the repo wherever you fancy and add a `config.json` file inside the main directory. It should look like this:
```
{
  "prefix": "PREFIX",
  "token": "YOUR_TOKEN",
  "owner": "YOUR_ID"
}
```
Punch in `node .` and you're now running a crappy bot.
