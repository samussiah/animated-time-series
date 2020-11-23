import getDimensions from './layout/getDimensions';
import layoutControls from './layout/controls';
import layoutCharts from './layout/charts';
import layoutFootnotes from './layout/footnotes';
import resize from './layout/resize';

export default function layout() {
    const main = this.util.addElement('main', d3.select(this.element));
    getDimensions.call(this, main); // determine widths of DOM elements based on width of main container
    const controls = layoutControls.call(this, main);//this.util.addElement('controls', main);
    const charts = layoutCharts.call(this, main);
    const footnotes = layoutFootnotes.call(this, main);

    window.addEventListener('resize', resize.bind(this));

    return {
        main,
        ...controls,
        charts,
        footnotes,
    };
}
