const { Client, Collection, Partials, GatewayIntentBits, ActivityType } = require('discord.js');
const { loadEvents } = require("./Handlers/eventHandler");
const { loadCommands } = require("./Handlers/commandHandler");

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});

client.on('ready', () => {
  updateBotActivity(); 

  console.log("Online");
});

async function updateBotActivity() {
  try {
    client.user.setPresence({
      activities: [{ name: 'SZERSZEN ON TOP', type: ActivityType.Playing }],
      status: 'online'
    });
  } catch (error) {
    console.error(error);
  }
}

client.cooldowns = new Collection();
client.config = require("./config.json");
client.commands = new Collection();

client.login(client.config.token).then(() => {
  loadEvents(client);
  loadCommands(client);
});
