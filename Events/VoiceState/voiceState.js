const { Client, VoiceState } = require('discord.js')
module.exports = {
    name: "voiceStateUpdate",
    /**
     * 
     *  @param {VoiceState} oldState 
     *  @param {VoiceState} newState 
     *  @param {Client} client  
    */

    async execute(oldState, newState, client){
        
        if (!oldState.channelId && newState.channelId) {
            //console.log(`El usuario ${newState.member.user.username} se unió al canal de voz.`);
        }
        // Verificar si el usuario abandonó un canal de voz
        else if (oldState.channelId && !newState.channelId) {
            //console.log(`El usuario ${oldState.member.user.username} abandonó el canal de voz.`);
        }
        // Verificar si el usuario cambió de canal de voz
        else if (oldState.channelId !== newState.channelId) {
            //console.log(`El usuario ${oldState.member.user.username} cambió del canal de voz ${oldState.channel.name} al canal de voz ${newState.channel.name}.`);
        }

    }
}