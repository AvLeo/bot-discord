const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
  } = require("discord.js");
  
  module.exports = {
    data: new SlashCommandBuilder()
      .setName("testing")
      .setDescription("Te respondere Pong!!"),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    execute(interaction) {
        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId('test')
            .setLabel('Click me')
            .setStyle(ButtonStyle.Success)
        )
      interaction.reply({ components:[button] });
    },
  };