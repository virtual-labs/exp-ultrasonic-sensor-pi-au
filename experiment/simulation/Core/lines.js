//  line class
import * as d3 from 'd3';

export class Line {
  constructor(svgContainer, id, stroke, strokeWidth) {
    this.svgContainer = svgContainer;
    this.id = id;
    this.stroke = stroke;
    this.strokeWidth = strokeWidth;
    this.lineData = [];
    this.lineGroup;
    this.isDrawing = false;
    this.svgContainer.on('dblclick', () => this.dblclick());
    this.svgContainer.on('click', () => this.click());
  }

  // CLICK to start with the given coordinates
  click(x, y) {
    if (this.isDrawing) {
      this.lineData.push([x, y]);
      this.updateLine();
    }
  }

  dblclick() {
    if (this.isDrawing) {
      this.isDrawing = false;
      this.lineData = [];
      this.lineGroup.remove();
    } else {
      this.isDrawing = true;
      this.lineGroup = this.svgContainer.append('g');
    }
  }

}
