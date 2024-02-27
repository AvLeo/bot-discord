const keys = require('../google-credentials.json');
const config = require('../config.json')
const { google } = require('googleapis');
const { format } = require('@formkit/tempo') 
const date = new Date()
const fechaActual = format(date, "short", "es")

const IDSpreedSheet = config.idSpreedsheet;

const auth = new google.auth.GoogleAuth({
    credentials: keys,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: "v4", auth: auth });

async function setAsistencia(Curso,idDiscord) {
    try {
        let value = false

        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: IDSpreedSheet,
            range: `${Curso}!A1:Z99`, // Rango de celdas que quieres leer
        });

        let idFecha = -1;
        for (let i = 0; i < res.data.values.length; i++) {
            const index = res.data.values[i].findIndex(date => date === fechaActual);
            if (index !== -1) {
                idFecha = index;
                break;
            }
        }


        const id = res.data.values.findIndex(alumno => alumno[4] === idDiscord)

        if(id >= 0 && idFecha !== -1){
            res.data.values[id][idFecha] = "1"
            value = true
        }else{
            console.log("No se encontró la fecha o el id de la persona")
            return value = false
        } 
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

        return value
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

        console.log('Rol Asigned - Datos cargados en sheet')

    }catch(error){
        console.error("SetIdDiscord: Error al leer o actualizar datos:", error);
    }
}

async function setNewDate(Curso, fecha, comision){
    try {
        let hojasSheet = ''
        if(comision.toLowerCase() === 't. mañana') hojasSheet = `A2:Z2` 
        if(comision.toLowerCase() === 't. tarde') hojasSheet = `A64:Z64` 
        
        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: IDSpreedSheet,
            range: `${Curso}!${hojasSheet}`, // Rango de celdas que quieres leer
        });

        res.data.values[0].push(fecha)

        const nuevosValores = res.data.values;

        // Actualizar los datos en la hoja de cálculo

        await sheets.spreadsheets.values.update({
            spreadsheetId: IDSpreedSheet,
            range: `${Curso}!${hojasSheet}`,
            valueInputOption: "RAW",
            requestBody: { values: nuevosValores }
        });

        console.log("Fecha cargada correctamente.");
    } catch (error) {
        console.error("SetFecha: Error al leer o actualizar datos:", error);
    }
}

module.exports = {
    setAsistencia,
    setIdDiscord,
    setNewDate
}
