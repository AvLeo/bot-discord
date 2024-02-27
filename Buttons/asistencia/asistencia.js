const {
    StringSelectMenuBuilder,
    ActionRowBuilder
} = require('discord.js')
const wait = require('node:timers/promises').setTimeout;
const { setAsistencia } = require('../../Spreedsheets/spreedsheets.js')

module.exports = {
    data : {
        name: `asistencia`,
    },
    async execute (interaction, client){
        
        await interaction.deferReply({ephemeral: true})
        const userID = interaction.user.id
        const curso = interaction.channel.parent.name
        
        switch(curso){
            case "JavaScript":    
                await setAsistencia("Javascript", userID)
                break;
            case "Base de Datos":    
                await setAsistencia("Python", userID)
                break;
            case "Python":    
                await setAsistencia("Javascript", userID)
                break;
            case "C#":    
                await setAsistencia("C#", userID)
                break;
            case "UXUI":    
                await setAsistencia("UX UI", userID)
                break;
        }
        await interaction.editReply('Asistencia cargada')
        await wait(5_000)
        await interaction.deleteReply()
    },
}