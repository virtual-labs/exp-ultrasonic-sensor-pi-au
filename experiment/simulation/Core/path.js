import { path } from 'd3-path';

export default class Custompath {
    
    constructor(startX ,  startY) {
        this.path = path();
        this.path.moveTo(startX, startY);
    }

    lineTo(x, y) {
        this.path.lineTo(x, y);
    }

    closePath() {
        this.path.closePath();
    }

    get() {
        return this.path;
    }

}