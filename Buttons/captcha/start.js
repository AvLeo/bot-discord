const CANVAS = require('canvas')
const STRING = require('randomstring')
const {
    StringSelectMenuBuilder,
    ActionRowBuilder
} = require('discord.js')


module.exports = {
    data : {
        name: `start`,
    },
    async execute (interaction, client){

        const captcha_value = STRING.generate(5);
        let op = 5

        async function captcha(){
            const image = CANVAS.createCanvas(480,240)
            const ctx = image.getContext('2d');
            
            ctx.beginPath();
            ctx.fillStyle= '#52566A'
            ctx.fillRect(0,0,image.width,image.height)
            ctx.closePath();

            ctx.fillStyle = "#EEEEEE"
            ctx.font ='50px sans-serif'
            ctx.textAlign = "center"
            ctx.fillText(captcha_value, 240, 130)
            
            return image

        }

        let image = await captcha()
        
        let menu = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
            .setCustomId('Captcha')
            .setPlaceholder('Selecciona el captcha correcto')
            .setDisabled(false)
            
            )
            while(op > 0){
                menu.components[0].addOptions({
                    label:`${STRING.generate(5)}`,
                    value:`${STRING.generate(5)}`
                })
                op--;
            }

            const correcto = Math.floor(Math.random() * 5);
            (menu.components[0].options[correcto].data.label = captcha_value),
            (menu.components[0].options[correcto].data.value = "Correcto")

            return interaction.reply({files:[image.toBuffer()], components:[menu], ephemeral:true})

    },
}