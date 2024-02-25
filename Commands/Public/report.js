const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
  } = require("discord.js");
  
  const discordID = require('../../discordID.json')

  module.exports = {
    data: new SlashCommandBuilder()
      .setName("reporte")
      .setDescription("Envia un reporte sobre un Usuario")
      .addUserOption(options => options.setName('user').setDescription('Usuario que quieres reportar').setRequired(true))
      .addStringOption(options => options.setName('razon').setDescription('Razón por la que quieres reportar').setRequired(true)),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {

        const reportado = interaction.options.getUser('user')
        const razon = interaction.options.getString('razon')

        const channel = interaction.guild.channels.cache.get(discordID.channels.admin)

        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
            .setCustomId(`ban_${reportado.id}`)
            .setLabel('Banear')
            .setStyle(ButtonStyle.Danger),

            new ButtonBuilder()
            .setCustomId(`kick_${reportado.id}`)
            .setLabel('Kick')
            .setStyle(ButtonStyle.Danger),

            new ButtonBuilder()
            .setCustomId(`timeout_${reportado.id}`)
            .setLabel('Timeout ( 10m )')
            .setStyle(ButtonStyle.Danger),
        )

        const embed = new EmbedBuilder()
            .setAuthor({name : `${interaction.user.username}. Ha realizado el reporte`})
            .setTitle(`${reportado.tag} ha sido reportado`)
            .addFields({name: `Razon del reporte`, value: razon})
            .setFooter({text: "Selecciona la opcion que crees correcta!"})

        await channel.send({embeds: [embed], components: [button]})
        await interaction.reply({content:"Tu reporte se envió correctamente"})
    },
  };