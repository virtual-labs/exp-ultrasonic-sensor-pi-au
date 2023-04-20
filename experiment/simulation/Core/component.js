import * as d3 from 'd3';
import { drag } from 'd3-drag';
import * as d3Selection from'd3-selection'

export class Component {

    constructor(id, svgContainer, url, scale) {
        this.id = id;
        this.svgContainer = svgContainer;
        this.url = url;
        this.sensor;
        this.scale = scale
        console.log('Component created: ' + this.id);
        console.log('url: ' + this.url);
        console.log('scale: ' + this.scale)
    }


    // load the svg file
     async load() {
        if(d3.select('#' + this.id).node() != null) {
            return;
        }
       const data =  await d3.xml(this.url)
           this.sensor = this.svgContainer.append('g')
                  .attr('transform', 'translate(' + [0, 0] + ') scale(' + this.scale + ')' )
                  .attr('id', this.id)
            this.sensor.node().append( d3.select(data.documentElement).node());
            this.sensor.call(drag().on('start', this.dragstarted).on('drag', this.dragged).on('end', this.dragended));
    }


    dragstarted(e) {
        d3.select(this).raise().classed('active', true);
    }

    dragged = (e) => {
            this.sensor.attr('transform', 'translate(' + [e.sourceEvent.offsetX , e.sourceEvent.offsetY] + ') scale(' + this.scale + ')' );
    }

    dragended(e) {
        d3.select(this).classed('active', false);
    }

}