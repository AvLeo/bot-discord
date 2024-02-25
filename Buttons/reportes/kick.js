const { PermissionFlagsBits } = require('discord.js')

module.exports = {
    data : {
        name: `kick`,
    },
    async execute (interaction, client, args){
        
        const reportado = args[0];
        const razon = "Usuario reportado"

        const hpmer = interaction.member.permissions.has(PermissionFlagsBits.KickMembers)
        if(!hpmer) return interaction.reply({content: 'No tienes los permisos necesarios', ephemeral: true})

        const member = await interaction.guild.members.fetch(reportado).catch(console.error)

        if(reportado === interaction.user.id) return interaction.reply({content:"No puedes kickearte a ti mismo", ephemeral: true})

        if(reportado === client.user.id) return interaction.reply({content:"No me puedes kickearme a mí", ephemeral: true})

        if(member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({content:"No puedes kickear a alguien del mismo rol o mayor que tú", ephemeral: true})

        if(!member.kickable) return interaction.reply({content:"No kickear a este usuario", ephemeral: true})

        await member.kick(razon).catch(console.error)
        await interaction.reply({content: `<@${reportado}> ha sido kickeado existosamente`})
    },
}