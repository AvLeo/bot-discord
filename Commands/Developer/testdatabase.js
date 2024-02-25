const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    Guild,
  } = require("discord.js");
  
  const testing = require('../../Schemas/test')

  module.exports = {
    data: new SlashCommandBuilder()
      .setName("testdatabase")
      .setDescription("data"),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction) {
        
        testing.findOne({ GuildID: interaction.guild.id }).then(data => {
            if(!data){
                testing.create({
                    GuildID: interaction.guild.id,
                    UserID: interaction.user.id
                })
            }else{
                console.log(data)
            }
        })

    },
  };