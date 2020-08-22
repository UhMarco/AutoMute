const fs = require('fs');

module.exports = {

  loadJSON: function (filename = '') {
    file = __dirname + `/../Data/${filename}`;
    return JSON.parse(
      fs.existsSync(file) ? fs.readFileSync(file).toString() : null
    )
  },

  createJSON: function (message) {
    template = __dirname + `/../Data/template.json`;
    created = __dirname + `/../Data/${message.guild.id}.json`;
    fs.copyFile(template, created, (err) => {
      if (err) {
        message.channel.send(`Error: ${err}`)
        throw err;
      }
    });
  },

  editJSON: function (message, content) {
    file = __dirname + `/../Data/${message.guild.id}.json`;
    fs.writeFile(file, JSON.stringify(content), (err) => {
      if (err) {
        message.channel.send(`Error: ${err}`)
        throw err;
      }
    });
  }

}
