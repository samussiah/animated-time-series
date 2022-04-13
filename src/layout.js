import getDimensions from './layout/getDimensions';
//import layoutControls from './layout/controls';
import layoutCharts from './layout/charts';
//import resize from './layout/resize';

export default function layout() {
    const main = this.util.addElement('main', d3.select(this.element));
    //const controls = layoutControls.call(this, main); //this.util.addElement('controls', main);
    const charts = layoutCharts.call(this, main);
    const { width, height } = getDimensions(charts, this.settings); // determine widths of DOM elements based on width of main container
    this.settings.width = width;
    this.settings.height = height;
    this.settings.dimensions = {
        width,
        height,
        margin: this.settings.margin,
        widthAdj: width - this.settings.margin.left - this.settings.margin.right,
        heightAdj: height - this.settings.margin.top - this.settings.margin.bottom,
    };

    //window.addEventListener('resize', resize.bind(this));

    return {
        main,
        //...controls,
        charts,
    };
}
