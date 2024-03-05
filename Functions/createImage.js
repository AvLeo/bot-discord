const { createCanvas, loadImage } = require('canvas');
const { format } = require('@formkit/tempo') 
const date = new Date()
const path = require('path');

const applyText = (canvas, text) => {
	const context = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		context.font = `${fontSize -= 70}px rubik`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (context.measureText(text).width > canvas.width - 300);

	// Return the result to use in the actual canvas
	return context.font;
};

async function createImage(Curso, Comision){
    
    const imagePath = path.join(__dirname,'banner.svg')
    const canvas = createCanvas(1920, 768);
    const ctx = canvas.getContext('2d');
    const fecha = format(date,"short", 'es')
    

    const backgroundImage = await loadImage(imagePath)
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#0099ff'
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
    //
    // const logoPath = path.join(__dirname,"logoedp.png")
    // const logo = await loadImage(logoPath)
    const logoSize = 200;
    const logoX = 25;
    const logoY = 25;

    // Dibujar el recorte circular alrededor de la imagen
    ctx.save(); // Guardar el estado del contexto
    ctx.beginPath();
    //ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    // Dibujar la imagen de logo dentro del recorte circular
    //ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

    ctx.restore();
    //

    if(Curso === "Base de Datos"){
      ctx.font = 'bold 150px sans-serif';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'left';
      ctx.fillText(`${Curso}`, 90 * 2 , 130 * 2);
    
      ctx.font = "bold 80px sans-serif"
      ctx.fillText(`${Comision}`,90 * 2 , 500)

      ctx.font = "bold 80px sans-serif"
      ctx.fillStyle = '#ffffff'
      ctx.fillText(`${fecha}`, 90 * 2 ,  580)

    }else{
      ctx.font = 'bold 150px sans-serif';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'left';
      ctx.fillText(`${Curso}`, 117 * 2 , 130 * 2);
      
      ctx.font = "bold 80px sans-serif"
      ctx.fillText(`${Comision}`,117 * 2 , 500)
  
      ctx.font = "bold 80px sans-serif"
      ctx.fillStyle = '#ffffff'
      ctx.fillText(`${fecha}`, 117 * 2 ,  580)
    }
    
    

    // Convertir el canvas a una imagen buffer
    const buffer = canvas.toBuffer('image/png');

    // Retornar el buffer directamente
    return buffer
  }

  module.exports = {
    createImage
}