# BOT-DISCORD

Bot de discord creado con el propósito de tomar asistencias para los cursos de Escuela de Programación



## Installation

Dependencias que son requeridas

#### discord.js
```bash
  npm install discord.js 
```
#### canvas
```bash
  npm install canvas 
```
#### glob - version 8.0.3
```bash
  npm install glob@8.0.3 
```
#### googleapis
```bash
  npm install googleapis 
```
#### randomstring
```bash
  npm install randomstring 
```
#### util
```bash
  npm install util 
```
#### ascii-table
```bash
  npm install ascii-table 
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

