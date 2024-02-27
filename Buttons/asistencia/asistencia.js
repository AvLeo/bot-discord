const {
    StringSelectMenuBuilder,
    ActionRowBuilder
} = require('discord.js')
const wait = require('node:timers/promises').setTimeout;
const { setAsistencia } = require('../../Spreedsheets/spreedsheets.js')
const { format } = require('@formkit/tempo') 
const date = new Date()

module.exports = {
    data : {
        name: `asistencia`,
    },
    async execute (interaction, client){
        
        await interaction.deferReply({ephemeral: true})
        const userID = interaction.user.id
        const curso = interaction.channel.parent.name
        const fecha = format(date, "short", "es")
        
        let valueAsistencia;
        
        switch(curso){
            case "JavaScript":
                valueAsistencia = await setAsistencia("Javascript", userID)
                break;
            case "Base de Datos":
                valueAsistencia = await setAsistencia("Python", userID)
                break;
            case "Python":
                valueAsistencia = await setAsistencia("Javascript", userID)
                break;
            case "C#":
                valueAsistencia = await setAsistencia("C#", userID)
                break;
            case "UX UI":
                valueAsistencia = await setAsistencia("UX UI", userID)
                break;
        }

        if(valueAsistencia){
            await interaction.editReply('Asistencia cargada')
            await wait(5_000)
        }else{
            await interaction.editReply('❎ Error a cargar el presente ❎ | Fuera de la fecha')
            await wait(5_000)
        }
        await interaction.deleteReply()
    },
}