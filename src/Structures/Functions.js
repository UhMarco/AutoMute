const fs = require('fs');

module.exports = {

  // JSON FUNCTIONS

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
  },


  // OTHER FUNCTIONS

  violation: function (message) {

    let file = module.exports.loadJSON(`${message.guild.id}.json`);

    console.log("Running violation function.");

    if (file.limit == 0) return false;

    let found = false;
    let punish = false;

    for (var i = 0; i < file.history.length; i++) { // Check if user already has violation history...
      if (file.history[i][0] == message.author.id) {
        found = true;
        file.history[i][1]++; // Increase history by one.
        console.log("History found - increased by 1.");

        if (file.history[i][1] >= file.limit) {
          // Punish
          console.log("Punishing and resetting violations.");
          file.history.pop(i)
          punish = true;
        }

      }
    }

    if (!found) { // New offence.
      file.history.push([message.author.id, 1]);
      console.log("New offence.");
    }

    // Finally update file.
    module.exports.editJSON(message, file);
    console.log("File updated.");
    return punish;
  }

}
