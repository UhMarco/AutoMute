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

    let history = file.history;
    let limit = file.limit;

    console.log(`History: ${history} / Limit: ${limit}`);

    if (limit == 0) return;

    var found = false;
    var violations = 1;

    for (var i = 0; i < history.length; i++) { // Check if user already has violation history...
      if (history[i][0] == message.author.id) {
        found = true;
        violations = history[i][1]
        violations++; // Increase history by one.
        console.log("History found - increased by 1.");
      }
    }

    if (!found) { // New offence.
      history.push([message.author.id, violations]);
      console.log("New offence.");
    }

    if (violations > limit) {
      // Punish
      console.log("Punishing and resetting violations.");
      violations = 0;
    }

    // Finally update file.
    module.exports = editJSON(message, file);
    console.log("File updated.");

  }

}
