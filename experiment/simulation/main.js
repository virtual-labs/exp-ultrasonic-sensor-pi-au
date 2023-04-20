/* eslint-disable max-len */
import * as d3 from 'd3';
import { Component } from './Core/component.js';
import { rasberryPiConnectors, ledConnectors, resistorConnectors, rasberryPiPinsMaps, sensorConnectors } from './components/componentList.js';
import { contours, Path } from 'd3'
import {codeLogic} from './components/codeLogic.js';
import {connectionLogs} from './Core/connectionLog.js';
import { errorThrower } from './Core/errorHandler.js';
const svgContainer = d3.select('#svg').append('svg')
        .attr('id', 'svgContainer')
        .attr('height', window.innerHeight - document.getElementById('svg').offsetTop)
        .attr('width', document.getElementById('svg').offsetWidth);

const raspberry = new Component('raspberry', svgContainer, './assets/pi3dirk.svg', 1);
const oneKResistorComponent = new Component('OnekResistor', svgContainer, './assets/1kResistor.svg', 0.11111111);
const twoKResistorComponent = new Component('TwokResistor', svgContainer, './assets/2kResistor.svg', 0.1111111);
const sensor = new Component('ultraSonicsensor', svgContainer, './assets/sensor.svg', 0.1);
const object = new Component('box', svgContainer, './assets/box.svg', 0.15);

const raspberryPi = document.getElementById('rasberryPi');
const oneKResitor = document.getElementById('1kResistor');
const twoKResitor = document.getElementById('2kResistor');
const sensorComponent = document.getElementById('sensor');
const objectComponent = document.getElementById('object');

const isAConnector = e => rasberryPiConnectors.includes(e.srcElement.id) || ledConnectors.includes(e.srcElement.id) || resistorConnectors.includes(e.srcElement.id) || sensorConnectors.includes(e.srcElement.id);
const displayInfo = document.getElementById('displayInfo');
const codeSubmit = document.getElementById('codeSubmit');

const showDistance = () => {
        const box = document.getElementById('box').getBoundingClientRect();
        const sensor = document.getElementById('ultraSonicsensor').getBoundingClientRect();
        const center1 = {
                x: box.left + box.width / 2,
                y: box.top + box.height / 2
              };
              
              const center2 = {
                x: sensor.left + sensor.width / 2,
                y: sensor.top + sensor.height / 2
              };
        const distance = Math.sqrt(Math.pow(center1.x - center2.x, 2) + Math.pow(center1.y - center2.y, 2));
        displayInfo.innerHTML = `Distance: ${distance.toFixed(2)}`;
}


raspberryPi.addEventListener('click', async() => await raspberry.load());
oneKResitor.addEventListener('click', () => oneKResistorComponent.load());
twoKResitor.addEventListener('click', () => twoKResistorComponent.load());
sensorComponent.addEventListener('click', () => sensor.load());
objectComponent.addEventListener('click', async () => {
      await  object.load()
    
});

let path = []
let pathCreator;
const connections = new connectionLogs('connectionLog');
const error = new errorThrower('errorBox', 'errorHeading', 'errorText', 'closeErrorBox');
let pathCount = 0;



svgContainer.on('dblclick', (e) => {

        if( isAConnector(e) & pathCreator==undefined) {
                pathCreator = new Path();
                pathCreator.moveTo(e.offsetX, e.offsetY);
                connections.addConnection({
                        lineID: `path${pathCount}`,
                        x: e.offsetX,
                        y: e.offsetY,
                        connector : e.srcElement.id
                });
                svgContainer.style('cursor', 'crosshair');
                return;
        }

        if(e.srcElement.id == 'svgContainer' && !rasberryPiConnectors.includes(e.srcElement.id) ) {
        // add the current point
        pathCreator.lineTo(e.offsetX, e.offsetY);
     
        // add the path to the svg
        svgContainer.append('path')
        .attr('d', pathCreator.toString())
        .attr('stroke', 'black')
        .attr('stroke-width', '2px')
        .attr('fill', 'none')
        .attr('id', `path${pathCount}`);
        return;
        }

        if( isAConnector(e) && pathCreator) {
                pathCreator.lineTo(e.offsetX, e.offsetY);
                // add the path to the svg
                svgContainer.append('path')
                .attr('d', pathCreator.toString())
                .attr('stroke', 'black')
                .attr('stroke-width', '2px')
                .attr('fill', 'none')
                .attr('id', `path${pathCount}`);
                connections.addConnection({
                        lineID: `path${pathCount}`,
                        x: e.offsetX,
                        y: e.offsetY,
                        connector : e.srcElement.id
                });
                pathCount++;
                // Change the cursor back to the default
                svgContainer.style('cursor', 'default');
                pathCreator = null;
                console.log('connectedPointSequence', connectedPointSequence);
                return;
        }
});



svgContainer.on('mouseover', (e) => {
        if (rasberryPiConnectors.includes(e.srcElement.id)) {
                displayInfo.innerHTML = rasberryPiPinsMaps[e.srcElement.id];
        }
});

codeSubmit.addEventListener('click', () => {

        const result = codeLogic(connections.getConnectionLog());

        if(result==true) {
                const box = document.getElementById('box');
                box.addEventListener('mousemove',showDistance)
                document.querySelector("#my-drawer-4").click()
        }
        else {
        
        
                result.error ? error.throw('Error', result.error) : error.throw('Error', 'Please connect the components properly. Refer to the connection diagram.');

        }
});
