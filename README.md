# BOT-DISCORD

Bot de discord creado con el propósito de tomar asistencias para los cursos de Escuela de Programación

## README EN PREPARACIÓN (vaya a saber cuando lo termine)

## Comandos

##### Asistencia -> /asistencia "curso" "comision"
Este comando envia un mensaje al canal "asistencia" correspondiente del curso seleccionado. Tambien a su vez en el google sheet configurado, se agrega una clase con la fecha actual y en la hoja del curso correspondiente

El mensaje enviado al canal del curso contiene un boton "Presente" el cual el alumno puede presionar para dar el presente de la clase, pero antes corrobora si el alumno existe como alumno del curso sobre google sheet y si en el momento que se presionó el boton es el mismo de la ultima fecha de clases.

Dicho boton se desahibilita pasados los 30 minutos desde que se crea, como otro metodo de seguridad para tiempo limite de dar el presente y dar presente repetidamente

##### Captcha -> /captcha "canal" (opcional)

Envia un mensaje para que el usuario ingresante pueda verificarse y que se le asigne el rol de "Alumno"

##### Clear -> /clear "cantidad" "usuario" (opcional)

Eliminar los ultimos mensajes "cantidad" pasada, y si se selecciona un usuario, solo borra los mensajes de ese usuario

##### CreateModal -> /createmodal "canal"

##### CreateVoiceChannel -> /createvoicechannel "canal"

##### timeout -> /timeout "usuario"

## Installation

Dependencias que son requeridas
- discord.js 
- canvas 
- glob@8.0.3 
- googleapis 
- randomstring 
- util 
- ascii-table 
- @formkit/tempo

#### Install all dependeces
```bash
  npm install discord.js canvas glob@8.0.3 googleapis randomstring util ascii-table @formkit/tempo
```
    
## Config / *.json

#### config.json
```json
{
    "token":"ID_TOKEN_BOT",
    "idSpreedsheet":"ID_SPREEDSHEET"
}
```
#### google-credentials.json

El siguiente .json se obtiene cuando se configura el proyecto en [Console Google Developers](https://console.cloud.google.com/) .. Activando la API de DRIVE y SHEET
```json
{
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": "",
  "universe_domain": ""
}

```
#### discordID.json
```json
{
    "role":{
        "alumno":"ID_ROLE",
        "javascript":"ID_ROLE",
        "baseDeDatos":"ID_ROLE",
        "uxui":"ID_ROLE",
        "python":"ID_ROLE",
        "c":"ID_ROLE"
    },
    "channels":{
        "javascript":"ID_CHANNEL",
        "baseDeDatos":"ID_CHANNEL",
        "uxui":"ID_CHANNEL",
        "python":"ID_CHANNEL",
        "c":"ID_CHANNEL",
        "admin":"ID_CHANNEL"
    },
    "userAdmin":{
        "userName":"ID_USER"
    }
}
```

