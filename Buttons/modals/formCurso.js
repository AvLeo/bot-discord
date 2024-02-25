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
        
        
        // client.on(Events.InteractionCreate, async (interaction) => {
        //     await interaction.deferReply({ ephemeral:true })


        //     if (!interaction.isModalSubmit()) return;
                

        //         const dni = interaction.fields.getTextInputValue('dni')
        //         const resCurso = interaction.fields.getTextInputValue('curso')
        //         const userID = interaction.user.id
        //         let res; 
        //         switch(resCurso.toLowerCase()){
        //             case "javascript":
        //                 res = await setIdDiscord("Javascript",dni,userID)
        //                 break;
        //             case "base de datos":
        //                 res = await setIdDiscord("Base de Datos",dni,userID)
        //                 break;
        //             default:
        //                 res = "Curso no encontrado"
        //         }

        //         console.log(res)

        //         if(res === undefined){
        //             await interaction.editReply({content: "Rol asignado", ephemeral: true})
        //             await interaction.member.roles.add("1211299220355686441").then(res => console.log("Rol Agregado"))
        //             await wait(3_000)
        //         }else if(res === "Curso no encontrado"){
        //             await interaction.editReply({content: "No encontramos el curso ingresado, revisa que esté bien escrito", ephemeral: true})
        //             await wait(10_000)
        //         }else if(res === "Alumno no econtrado"){
        //             await interaction.editReply({content: "No te encontramos en la base de datos, el DNI ingresado \n\n Si crees que es un error, habla con soporte", ephemeral: true})
        //             await wait(5_000)
        //         }
                
        //         await interaction.deleteReply()
        // })
    },
}