const { ChatInputCommandInteraction } = require("discord.js");
const wait = require('node:timers/promises').setTimeout;
const { setIdDiscord } = require('../../Spreedsheets/spreedsheets.js')
const discordID = require('../../discordID.json')

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()){ 
    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        content: "This command is outdated.",
        ephermal: true,
      });

    if (command.developer && interaction.user.id !== discordID.userAdmin.LeoA)
      return interaction.reply({
        content: "This copmmand is only available to the developer.",
        ephermal: true,
      });

    command.execute(interaction, client);
    }else if(interaction.isButton()){
      
      const buttonId = interaction.customId.split("_");
      const button = client.buttons.get(buttonId[0]);
      if(!button) return
      button.execute(interaction, client, buttonId.slice(1))

    }else if(interaction.isModalSubmit()){
      
      if(interaction.customId === "cursomodals"){

        await interaction.deferReply({ ephemeral:true })
        const dni = interaction.fields.getTextInputValue('dni')
        const resCurso = interaction.fields.getTextInputValue('curso')
        const userID = interaction.user.id
        const userName = interaction.member.displayName

        let res;
        let idRolCurso = "" 
        
        switch(resCurso.toLowerCase()){
            case "javascript":
                res = await setIdDiscord("Javascript",dni,userID,userName)
                idRolCurso = discordID.role.javascript
                break;
            case "base de datos":
                res = await setIdDiscord("Base de Datos",dni,userID,userName)
                idRolCurso = discordID.role.baseDeDatos
                break;
            case "c#":
                res = await setIdDiscord("C#",dni,userID,userName)
                idRolCurso = discordID.role.c
                break;
            case "python":
                res = await setIdDiscord("Python",dni,userID,userName)
                idRolCurso = discordID.role.python
                break;
            case "ux ui":
                res = await setIdDiscord("UX UI",dni,userID,userName)
                idRolCurso = discordID.role.uxui
                break;
            default:
                res = "Curso no encontrado"
        
        }
        
        console.log(res)
        console.log(userName)

        if(res === undefined){
          await interaction.member.roles.add(idRolCurso).then(res => console.log("Rol Agregado")).catch(error =>console.log("No se asigno el rol"))
            await interaction.editReply({content: "Rol asignado", ephemeral: true})
            await wait(3_000)
        }else if(res === "Curso no encontrado"){
            await interaction.editReply({content: "No encontramos el curso ingresado, revisa que esté bien escrito", ephemeral: true})
            await wait(10_000)
        }else if(res === "Alumno no econtrado"){
            await interaction.editReply({content: "No te encontramos en la base de datos, el DNI ingresado \n\n Si crees que es un error, habla con soporte", ephemeral: true})
            await wait(5_000)
        }
        
        await interaction.deleteReply()
      }
    }else{
      return;
    }
  },
};