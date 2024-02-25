const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("clear")
      .setDescription("Elimina la cantidad de mensajes que deseas!")
      .addIntegerOption(options => 
        options.setName('cantidad')
        .setDescription('cantidad de mensajes que quieres eliminar')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(99)
      )
      .addUserOption(options => 
        options.setName('usuario')
        .setDescription('Mensajes del usuario que quieres eliminar')
      ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
    
        const cantidad = interaction.options.getInteger('cantidad')
        const user = interaction.options.getUser('usuario')

        const Messages = await interaction.channel.messages.fetch()

        if(user){

            let i = 0
            let deletedMessages = []
    
    
            Messages.filter( msg => {
                if(msg.author.id === user.id && cantidad > i){
                    deletedMessages.push(msg)
                    i++
                }
            })

            interaction.channel
                .bulkDelete(deletedMessages, true)
                .then(msg => {
                    interaction.reply({content:`Se han eliminado ${msg.size} de @${user.tag}`})
                })

        }else{

            interaction.channel
                .bulkDelete(cantidad, true)
                .then(msg => {
                    interaction.reply({content:`Se han eliminado ${msg.size} mensajes`})
                })

        }
    
    },
  };