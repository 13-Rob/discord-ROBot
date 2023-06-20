const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    // When client is ready, run once
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};