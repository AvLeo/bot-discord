const {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChannelType,
    PermissionsBitField,
    GuildChannelManager,
    GuildManager,
    GuildMemberManager,
    VoiceChannel
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
            const channelsName = ["Sala A", "Sala B", "Sala C","Sala D", "Sala E" ];
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
                    idChannelMain = discordID.category.python
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

            // Alumnos conectados

            const mainChannel = guild.channels.cache.get(idChannelMain)
            const cantAlumnos = guild.channels.cache.get(idChannelMain).members.size
            const alumnosConnected = mainChannel.members
            let cantidadCanales = 0;
            
            if(cantAlumnos === 0) return await interaction.editReply('No puedes crear canales, porque hay 0 alumnos conectados! 🤣')
            if(cantAlumnos > 0 && cantAlumnos<= 5) cantidadCanales = 1;
            if(cantAlumnos > 5 && cantAlumnos <= 10) cantidadCanales = 2;
            if(cantAlumnos > 10 && cantAlumnos <= 20) cantidadCanales = 3;
            if(cantAlumnos > 20 && cantAlumnos <= 30) cantidadCanales = 4;
            if(cantAlumnos > 30) cantidadCanales = 5;
            console.log("Cantidad de alumnos conectados: " + cantAlumnos)
            console.log("Cantidad de canales a crear: " + cantidadCanales)
            
            // Crear canales 

            for (let i = 0; i < cantidadCanales; i++) {
                const channelName = channelsName[i];
                const channelsInCategory = guild.channels.cache.filter(channel => channel.parentId === categoryId)
                const exite = channelsInCategory.find(channel => channel.name.toLowerCase() === channelName.toLowerCase());
                
                if(exite){
                    idChannels.push(exite.id)
                }else{
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
            }

            // Separacion de alumnos
            let index = 0;
            for (const [memberID, member] of alumnosConnected) {
                try{
                    const channelIndex = index % cantidadCanales;
                    await member.voice.setChannel(idChannels[channelIndex], "Comienza la hora de práctica")
                    index++
                }catch(error){
                    console.error("error en:",error)
                }
            }

            // Eliminar canal despues de X tiempo

            setTimeout(() => {
                for (let i = 0; i < idChannels.length; i++) {
                    const channelActivo = guild.channels.cache.get(idChannels[i])
                    channelActivo.delete("Tiempo de sala agotado")
                }
            }, 60 * 60 * 1000)


            //
            interaction.editReply({ content: "Se crearon los canales", ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.editReply({ content: "Ocurrió un error. Revisa el log del servidor.", ephemeral: true });
        }
    }
};
