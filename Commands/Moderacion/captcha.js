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
      .setName("captcha")
      .setDescription("Envia un mensaje de verificacion")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
      .addChannelOption(options => options.setName('canal').setDescription('Canal donde enviar el msj')),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {

        const channel = interaction.options.getChannel('canal') || interaction.channel

        const embed = new EmbedBuilder()
        .setTitle("***Términos y condiciones | Escuela de Programación - GC ***\n\n~~-------------------------------------------------------------~~\n\n*Al aceptar términos y condiciones, se te otorgará el rol de Alumno*")

        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId('start')
            .setLabel('Aceptar términos y condiciones')
            .setStyle(ButtonStyle.Success)
        )

        await channel.send({embeds: [embed], components:[button]})
        await interaction.reply({content:'El mensaje fue enviado correctamente!'})
    },
  };