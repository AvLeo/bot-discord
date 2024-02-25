const { ChatInputCommandInteraction , SlashCommandBuilder, PermissionFlagsBits, Client} = require('discord.js')

const { loadCommands } = require('../../Handlers/commandHandler')
const { loadEvents } = require('../../Handlers/eventHandler')
const { loadButtons } = require('../../Handlers/buttonHandler')


module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName('reload')
        .setDescription('Recargando comandos/eventos')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(options => options.setName('events').setDescription('Recargando eventos'))
        .addSubcommand(options => options.setName('commands').setDescription('Recargando comandos'))
        .addSubcommand(options => options.setName('buttons').setDescription('Recarga tus botones')),

        /**
         * 
         * @param {ChatInputCommandInteraction} interaction
         * @param {Client} client
         */

        execute(interaction, client){
            const subCommand = interaction.options.getSubcommand()

            switch (subCommand) {
                case "events": {
                    for(const [key, value] of client.events)
                    client.removeListener(`${key}`, value, true)
                    loadEvents(client)
                    interaction.reply({content:"Los eventos fueron recargados", ephemeral: true})
                }
                    
                    break;
                case "commands":{
                    loadCommands(client)
                    interaction.reply({content:"Los comandos fueron recargados", ephemeral: true})
                }
                    
                    break;
                case "buttons":{
                    loadButtons(client)
                    interaction.reply({content:"Los botones fueron recargados", ephemeral: true})
                }
                    
                    break;
            }
        }
}