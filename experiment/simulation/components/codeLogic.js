import {rasberryPiConnectors, rasberryPiPinsMaps} from './componentList.js';

export const codeLogic = (connectedPointSequence) => {

    if(connectedPointSequence.length==0) {
        return {
            "error": "No connection found"
        }
    }
    

    const requiedConnections = [
      "GPIO",
        "GND",
        "1kresistor_pin_1",
        "1kresistor_pin_2",
        "2kresistor_pin_1",
        "2kresistor_pin_2",
        "Vcc",
        "trig",
        "Echo",
        "gnd",
        "5V PWR"
    ]

    let count = 0;



    connectedPointSequence.forEach(connections => {
        
        if( requiedConnections.find( e => e == connections.connector)){
            count++;
            return;
        }

        if(rasberryPiPinsMaps[connections.connector] == 'GND') {
            count++;
            return;
        }

        if(rasberryPiPinsMaps[connections.connector].includes('GPIO')) {
            console.log(rasberryPiPinsMaps[connections.connector])
            console.log(document.querySelector("#ledPin").value)
            if(rasberryPiPinsMaps[connections.connector].includes(document.querySelector("#ledPin").value) ) {
            count++;
            return;
            }
        }


    });
    return  (count == 10)
}