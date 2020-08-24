const fs = require('fs');

module.exports = {

  createJSON: function (message) {
    template = __dirname + `/../Data/template.json`;
    created = __dirname + `/../Data/${message.guild.id}.json`;
    fs.copyFileSync(template, created);
    return module.exports.loadJSON(`${message.guild.id}.json`);
  },

  loadJSON: function (filename = '') {
    file = __dirname + `/../Data/${filename}`;
    return JSON.parse(
      fs.existsSync(file) ? fs.readFileSync(file).toString() : null
    )
  },

  editJSON: function (message, content) {
    file = __dirname + `/../Data/${message.guild.id}.json`;
    fs.writeFile(file, JSON.stringify(content), (err) => {
      if (err) {
        message.channel.send(`Error: ${err}`)
        throw err;
      }
    });
  },

  deleteJSON: function (message) {
    file = __dirname + `/../Data/${message.guild.id}.json`;
    fs.unlink(file, (err) => {
      if (err) {
        message.channel.send(`Error: ${err}`)
        throw err;
      }
    })
  }

}
