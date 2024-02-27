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
  const { setNewDate } = require('../../Spreedsheets/spreedsheets.js')
  const { format } = require('@formkit/tempo') 
  const date = new Date()

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
        ))
        .addStringOption(option => 
          option.setName('comision')
          .setDescription("Selecciona la comision correspondiente")
          .setRequired(true)
          .addChoices(
            {name: "A", value: "A"},
            {name: "B", value: "B"},
            {name: "C", value: "C"},
          )
        ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {

        const fecha = format(date, "short", "es")

        const curso = interaction.options.getString('curso')
        const comision = interaction.options.getString('comision')

        let channel;
        switch(curso){
          case "JavaScript":
            channel = interaction.guild.channels.cache.get(discordID.channels.javascript) // ID_CANAL
            await setNewDate("Javascript", fecha, comision)
            break;
          case "Base-de-Datos":
            channel = interaction.guild.channels.cache.get(discordID.channels.baseDeDatos) // ID_CANAL
            await setNewDate("Base de Datos", fecha, comision)
            break;
          case "UXUI":
            channel = interaction.guild.channels.cache.get(discordID.channels.uxui) // ID_CANAL
            await setNewDate("UXUI", fecha, comision)
            break;
          case "Python":
            channel = interaction.guild.channels.cache.get(discordID.channels.python) // ID_CANAL
            await setNewDate("Python", fecha, comision)
            break;
          case "C#":
            channel = interaction.guild.channels.cache.get(discordID.channels.c) // ID_CANAL
            await setNewDate("C#", fecha, comision)
            break;
          
        }
        const embed = new EmbedBuilder()
        .setTitle(`Asistencia para ${curso} | ${fecha}`)

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