import { rasberryPiPinsMaps } from "../components/componentList";

export class connectionLogs {

    constructor(logLocationId ) {
        this.logLocationId = logLocationId;
        this.connections = [];
    }


    addConnection(connection) {
        this.connections.push(connection);
        this.logConnectionsToHtml();
        console.log('connections', this.connections);
    }

    logConnectionsToHtml() {
    if(this.connections.length % 2 == 0) {
        let li = document.createElement('li');

        const firstConnection = rasberryPiPinsMaps[this.connections[this.connections.length-2].connector]  ? rasberryPiPinsMaps[this.connections[this.connections.length-2].connector] : this.connections[this.connections.length-2].connector;
        const secondConnection = rasberryPiPinsMaps[this.connections[this.connections.length-1].connector]  ? rasberryPiPinsMaps[this.connections[this.connections.length-1].connector] : this.connections[this.connections.length-1].connector;

        li.innerHTML = `Connection no. ${this.connections.length/2} : ${firstConnection} to ${secondConnection}`;
        document.getElementById(this.logLocationId).appendChild(li);
        return;


    }}

    getConnectionLog() {
        return this.connections;
    }



}