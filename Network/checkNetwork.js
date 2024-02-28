const wifi = require('node-wifi')

const institucionSSID = "Pais_Digital"

wifi.init({
    iface: 'eth0' // Si no especificas una interfaz, se seleccionará automáticamente
});


async function checkNet(){
    return new Promise((resolve, reject) => {
        wifi.getCurrentConnections((error, networks) => {   // O usamos .scan (Corroboramos si se encuentra en rango del wifi de Pais_Digital)
            if (error) {
                reject(error);
            } else {
                console.log(networks)
                const estaConectado = networks.some(network => network.bssid === institucionSSID);
                resolve(estaConectado);
            }
        });
    });
}

module.exports = {
    checkNet
}