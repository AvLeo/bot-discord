const {
    ActionRowBuilder,
    Events,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
} = require('discord.js')
const wait = require('node:timers/promises').setTimeout;


module.exports = {
    data : {
        name: `modalscurso`,
    },
    async execute (interaction, client){
        
        const modal = new ModalBuilder()
            .setCustomId('cursomodals')
            .setTitle('Auto-rol para cursos')
            
        const numDocumento = new TextInputBuilder()
            .setCustomId('dni')
            .setLabel('Ingresa tu dni sin puntos "." ')
            .setPlaceholder('40123456')
            .setStyle(TextInputStyle.Short)

        const curso = new TextInputBuilder()
        .setCustomId('curso')
        .setLabel('Ingresa tu curso')
        .setPlaceholder('Base de Datos')
        .setStyle(TextInputStyle.Short)

        const rowCurso = new ActionRowBuilder().addComponents(curso)
        const rowDni = new ActionRowBuilder().addComponents(numDocumento)

        
        modal.addComponents(rowDni, rowCurso)
        
        await interaction.showModal(modal)        
    },
}