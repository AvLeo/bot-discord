const keys = require('../google-credentials.json');
const config = require('../config.json')
const { google } = require('googleapis');

const IDSpreedSheet = config.idSpreedsheet;

const auth = new google.auth.GoogleAuth({
    credentials: keys,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: "v4", auth: auth });

async function setAsistencia(Curso,idDiscord) {
    try {
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: IDSpreedSheet,
            range: `${Curso}!A1:Z99`, // Rango de celdas que quieres leer
        });

        // Modificar los valores
        const id = res.data.values.findIndex(alumno => alumno[4] === idDiscord)

        id >= 0 ? res.data.values[id].push("Presente") : false
        // Crear un nuevo arreglo con los valores actualizados

        const nuevosValores = res.data.values;

        // Actualizar los datos en la hoja de cálculo

        await sheets.spreadsheets.values.update({
            spreadsheetId: IDSpreedSheet,
            range: `${Curso}!A1:Z99`,
            valueInputOption: "RAW",
            requestBody: { values: nuevosValores }
        });

        console.log("Datos actualizados correctamente.");
    } catch (error) {
        console.error("SetAsistencia: Error al leer o actualizar datos:", error);
    }
}

async function setIdDiscord(Curso, dni, idDiscord, userName){
    try{
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: IDSpreedSheet,
            range: `${Curso}!A1:Z99`,
        });

        const id = res.data.values.findIndex(alumno => alumno[3] === dni)

        if(id >= 0 ){
            res.data.values[id][4] = idDiscord
            res.data.values[id][5] = `#${userName}`
        }else {
            return "Alumno no econtrado"
        } 
        

        const nuevosValores = res.data.values;

        await sheets.spreadsheets.values.update({
            spreadsheetId: IDSpreedSheet,
            range: `${Curso}!A1:Z99`,
            valueInputOption: "RAW",
            requestBody: { values: nuevosValores }
        });

    }catch(error){
        console.error("SetIdDiscord: Error al leer o actualizar datos:", error);
    }
}

module.exports = {
    setAsistencia,
    setIdDiscord
}
