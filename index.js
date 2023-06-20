// https://discordjs.guide/
// Node's native file system module
const fs = require('node:fs');

// Node's native path utility module
const path = require('node:path');

// Require necessary discord.js classes
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');

// New client instance
// Guilds refers to Discord Servers
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Used to store and efficiently retrieve commands
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the collection
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute property`);
        }
    }
}

// // When client is ready, run once
// client.once(Events.ClientReady, c => {
//     console.log(`Ready! Logged in as ${c.user.tag}`);
// });

// // Listener for slash commands (interactions)
// client.on(Events.InteractionCreate, async interaction => {
//     // Not all interactions are ChatInputCommands
//     if (!interaction.isChatInputCommand()) return;

//     const command = interaction.client.commands.get(interaction.commandName);

//     if (!command) {
//         console.error(`No command matching ${interaction.commandName} was found.`);
//         return;
//     }

//     try {
//         await command.execute(interaction);
//     } catch (error) {
//         console.error(error);
//         if (interaction.replied || interaction.deferred) {
//             await interaction.followUp({
//                 content: 'There was an error while executing this command!',
//                 ephemeral: true,
//             });
//         } else {
//             await interaction.reply({
//                 content: 'There was an error while executing this command!',
//                 ephemeral: true,
//             })
//         }
//     }
//     console.log(interaction);
// });

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Log in to Discord
client.login(token);