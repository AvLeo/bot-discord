const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
  } = require("discord.js");


  module.exports = {
    data: new SlashCommandBuilder()
      .setName("createmodal")
      .setDescription("Crear modals de Auto-Rol Curso")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
      .addChannelOption(channel => 
            channel.setName('channel')
            .setDescription('canal donde mandar')
            .setRequired(true)
        ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {

        const channel = interaction.options.getChannel('channel')

        const embed = new EmbedBuilder()
        .setTitle("👆🏻 ***Lee con atención el mensaje anterior*** 👆🏻")

        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId('modalscurso')
            .setLabel("Realizar Form")
            .setStyle(ButtonStyle.Success)
        )

        await channel.send({embeds: [embed], components:[button]})
        await interaction.reply({content:'El mensaje fue enviado correctamente!'})
    },
  };