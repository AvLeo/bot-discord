const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChannelType,
    PermissionsBitField,
    Membe
} = require("discord.js");
const discordID = require('../../discordID.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("createvoiceschannels")
        .setDescription("Crea 3 canales de voz en la categoria que elijas.")
        .addStringOption(option =>
            option.setName('channelcourse')
                .setDescription("Elige la categoria donde crear los canales")
                .addChoices(
                    { name: "Javascript", value: "Javascript" },
                    { name: "Base de Datos", value: "Base de Datos" },
                    { name: "Python", value: "Python" },
                    { name: "IA Python", value: "IA Python" },
                    { name: "C#", value: "C#" },
                    { name: "React", value: "React" },
                    { name: "Java", value: "Java" }
                )
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        
        await interaction.deferReply({ ephemeral: true });

        try {
            const channelsName = ["Sala A", "Sala B", "Sala C"];
            const chosenCategory = interaction.options.getString('channelcourse');
            const guild = interaction.guild;
            const idChannels = []

            let categoryId;
            let idRole;
            let idChannelMain;

            switch (chosenCategory) {
                case "Javascript":
                    categoryId = discordID.category.javascript;
                    idRole = discordID.role.javascript
                    idChannelMain = discordID.voiceChannelMain.javascript
                    break;
                case "Base de Datos":
                    categoryId = discordID.category.basededatos;
                    idRole = discordID.role.baseDeDatos
                    idChannelMain = discordID.voiceChannelMain.basededatos
                    break;
                case "Python":
                    categoryId = discordID.category.python;
                    idRole = discordID.role.python
                    idChannelMain = discordID.voiceChannelMain.python
                    break;
                case "IA Python":
                    categoryId = discordID.category.iapython;
                    idRole = discordID.role.iapython
                    idChannelMain = discordID.voiceChannelMain.iapython
                    break;
                case "Java":
                    categoryId = discordID.category.java;
                    idRole = discordID.role.java
                    idChannelMain = discordID.voiceChannelMain.java
                    break;
                case "C#":
                    categoryId = discordID.category.c;
                    idRole = discordID.role.c
                    idChannelMain = discordID.voiceChannelMain.c
                    break;
                case "UXUI":
                    categoryId = discordID.category.uxui;
                    idRole = discordID.role.uxui
                    idChannelMain = discordID.voiceChannelMain.uxui
                    break;
                default:
                    // Handle invalid category selection gracefully
                    return interaction.editReply({
                        content: `La categoria "${chosenCategory}" no existe o no tienes permisos para crear canales en ella.`,
                        ephemeral: true
                    });
            }

            for (let i = 0; i < channelsName.length; i++) {
                const channel = await guild.channels.create({
                        name:channelsName[i],
                        type: ChannelType.GuildVoice,
                        parent: categoryId,
                        permissionOverwrites:[
                            {
                                id:idRole,
                                allow:[
                                    PermissionFlagsBits.SendMessages,
                                    PermissionFlagsBits.Stream,
                                    PermissionFlagsBits.ViewChannel,
                                    PermissionFlagsBits.Speak
                                ],
                                deny:[
                                    PermissionFlagsBits.Connect
                                ]
                            },
                            {
                                id:"1202619746902609940",
                                deny:[
                                    PermissionFlagsBits.ViewChannel,
                                    PermissionFlagsBits.Connect
                                ]
                            }
                        ]
                });
                idChannels.push(channel.id)
            }

            // Separacion de alumnos
            const mainChannel = guild.channels.cache.get(idChannelMain)
            const alumnosConnected = mainChannel.members
            // console.log(alumnosConnected)

            for (let i = 0; i < alumnosConnected.length; i++) {
                // console.log(userId)
                // console.log('----')
                // console.log(member)
                // console.log('--Channel--')
                // console.log(guild.channels.cache.get(idChannels[0]))
                // const user = alumnosConnected[i];
                // // const channelIndex = userId % idChannels.length;
                // const channelCache = guild.channels.cache.get(idChannels[0])
                // console.log(channelCache)
                // await user.voice.setChannel(channelCache,"Movido por x razon");
            }


            //
            interaction.editReply({ content: "Se crearon los canales", ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.editReply({ content: "Ocurrió un error. Revisa el log del servidor.", ephemeral: true });
        }
    }
};
