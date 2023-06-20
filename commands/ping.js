// use require to access external files
// use interaction.client to access client instance
const { SlashCommandBuilder } = require('discord.js');

// A command need at least a name and a description
// module.exports allows this class to be found by other files
module.exports =  {
    // data property provides the command definition for registering to Discord
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    // execute method contains the functionaliy of the command
    async execute(interaction) {
        // Interaction method confirms to Discord that the
        // bot successfully received an interaction
        await interaction.reply('Pong!');
    },
};