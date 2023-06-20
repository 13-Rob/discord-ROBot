// Require necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// New client instance
// Guilds refers to Discord Servers
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When client is ready, run once
client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord
client.login(token);