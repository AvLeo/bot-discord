const { PermissionFlagsBits } = require('discord.js')

module.exports = {
    data : {
        name: `ban`,
    },
    async execute (interaction, client, args){
        
        const reportado = args[0];
        const razon = "Usuario reportado"

        const hpmer = interaction.member.permissions.has(PermissionFlagsBits.BanMembers)
        if(!hpmer) return interaction.reply({content: 'No tienes los permisos necesarios', ephemeral: true})

        const member = await interaction.guild.members.fetch(reportado).catch(console.error)

        if(reportado === interaction.user.id) return interaction.reply({content:"No puedes banearte a ti mismo", ephemeral: true})

        if(reportado === client.user.id) return interaction.reply({content:"No me puedes banear a mí", ephemeral: true})

        if(member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({content:"No puedes banear a alguien del mismo rol o mayor que tú", ephemeral: true})

        if(!member.bannable) return interaction.reply({content:"No bannear a este usuario", ephemeral: true})

        await member.ban({deleteMessageSencods: 0, reason: razon}).catch(console.error)
        await interaction.reply({content: `<@${reportado}> ha sido baneado existosamente`})
    },
}