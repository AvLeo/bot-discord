const { createCanvas, loadImage } = require('canvas');
const { format } = require('@formkit/tempo') 
const date = new Date()
const path = require('path');

async function createImage(Curso, Comision){
    
    const imagePath = path.join(__dirname,'img.png')
    const canvas = createCanvas(700, 250);
    const ctx = canvas.getContext('2d');
    const fecha = format(date,"short", 'es')
    

    const backgroundImage = await loadImage(imagePath)
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#0099ff'
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
//
const logoPath = path.join(__dirname,"logoedp.png")
const logo = await loadImage(logoPath)
const logoSize = 200;
const logoX = 25;
const logoY = 25;

// Dibujar el recorte circular alrededor de la imagen
ctx.save(); // Guardar el estado del contexto
ctx.beginPath();
ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
ctx.closePath();
ctx.clip();

// Dibujar la imagen de logo dentro del recorte circular
ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

ctx.restore();
//
    // ctx.font = '20px Arial';
    // ctx.fillStyle = 'white';
    // ctx.textAlign = 'center';
    // ctx.fillText(`${Curso} - ${Comision} | ${fecha}`, canvas.width / 2, canvas.height / 2);
    
    // Convertir el canvas a una imagen buffer
    const buffer = canvas.toBuffer('image/png');

    // Retornar el buffer directamente
    return buffer
  }

  module.exports = {
    createImage
}