const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
    ButtonBuilder,
    ButtonStyle,
    ActionRowBuilder,
  } = require("discord.js");

  const discordID = require('../../discordID.json')

  module.exports = {
    data: new SlashCommandBuilder()
      .setName("asistencia")
      .setDescription("Marcado de Asistencia a clases")
      .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
      .addStringOption(options =>
        options.setName('curso')
        .setDescription('Nombre del curso que quieres tomar asistencia')
        .setRequired(true)
        .addChoices(
          {name: "JavaScript", value: "JavaScript"},
          {name: "Base-de-Datos", value: "Base-de-Datos"},
          {name: "UXUI", value: "UXUI"},
          {name: "Python", value: "Python"},
          {name: "C#", value: "C#"},
        )
      ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {

        const date = new Date()

        const curso = interaction.options.getString('curso')
        let channel;
        switch(curso){
          case "JavaScript":
            channel = interaction.guild.channels.cache.get(discordID.channels.javascript) // ID_CANAL
            break;
          case "Base-de-Datos":
            channel = interaction.guild.channels.cache.get(discordID.channels.baseDeDatos) // ID_CANAL
            break;
          case "UXUI":
            channel = interaction.guild.channels.cache.get(discordID.channels.uxui) // ID_CANAL
            break;
          case "Python":
            channel = interaction.guild.channels.cache.get(discordID.channels.python) // ID_CANAL
            break;
          case "C#":
            channel = interaction.guild.channels.cache.get(discordID.channels.c) // ID_CANAL
            break;
          
        }
        const embed = new EmbedBuilder()
        .setTitle(`Asistencia para ${curso} | ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`)

        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId('asistencia')
            .setLabel("Presente")
            .setStyle(ButtonStyle.Success)
        )

        await channel.send({embeds: [embed], components:[button]})
        await interaction.reply({content:'El mensaje fue enviado correctamente!'})

    },
  };