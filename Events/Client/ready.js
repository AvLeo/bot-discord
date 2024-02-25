const { loadCommands } = require('../../Handlers/commandHandler');
const config = require('../../config.json')
const mongoose = require('mongoose')

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
      console.log("El cliente ya esta listo");

      // await mongoose.connect(config.mongopass,{
      //   useNewUrlParser: true,
      //   useUnifiedTopology:true
      // }).then(res => console.log("Base de datos Conectada")).catch(error => console.error(error))

      loadCommands(client)
    },
};
