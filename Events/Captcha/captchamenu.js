const discordID = require('../../discordID.json')

module.exports = {
    name: "interactionCreate",

    async execute(interaction){
        if(interaction.isStringSelectMenu()){
            let select = interaction.values[0];

            console.log(select)
            console.log(interaction.customId)

            if(interaction.customId === "Correcto"){
                console.log('Acá rompo')
                interaction.message.components[0].components[0].data.disabled = true
                interaction.update({
                    components:[interaction.message.components[0]],
                    ephemeral: true
                })
                console.log('Acá no llegué')
    
            }

            // setTimeout(() => {
            //     interaction.deleteReply()
            // },5000)

            if(select === "Correcto"){
                interaction.member.roles.add(discordID.role.alumno).then(() => {
                    interaction.reply({content:"Haz sido verificado con exito", ephemeral: true})
                })
            }else{
                return interaction.reply({content:"La opcion seleccionada no es la correcta", ephemeral: true})
            } 
        }
    }
}