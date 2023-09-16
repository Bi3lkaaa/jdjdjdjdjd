function loadCommands(client) {
  const ascii = require('ascii-table');
  const fs = require('fs');
  const table = new ascii().setHeading('Komenda', "Status");

  let commandArray = [];

  const commandsFolder = fs.readdirSync(`./Commands`);
  for (const folder of commandsFolder) {
    const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
      const commandFile = require(`../Commands/${folder}/${file}`);

      client.commands.set(commandFile.data.name, commandFile);

      commandArray.push(commandFile.data.toJSON());

      table.addRow(file, 'załadowano')
      continue;
    }
  }

  client.application.commands.set(commandArray);

  return console.log(table.toString(), "\n Załadowano komendy")
}

module.exports = {loadCommands};