const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType
} = require('discord.js')
const { loadCommands } = require('../../Handlers/commandHandler');
const discordID = require('../../discordID.json')
const cron = require('node-cron')

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {

      loadCommands(client)
      
      cron.schedule('* 3 * * *', () => {
        
        let deletedChannels = []
        
        const channelsInCategory = client.channels.cache.filter(channel => channel.parentId === discordID.category.alumnos)
        
        channelsInCategory.filter(channel  => channel.type === 2 ? deletedChannels.push(channel.id): false)
        
        if(deletedChannels.length > 0){
          deletedChannels.forEach( channel => {
            const channelActive = client.channels.cache.get(channel);
            channelActive.delete()
          })
        }else{
          console.log("No hay canales de voz activos en Alumnos")
        }
  
      });

      
    },
};
