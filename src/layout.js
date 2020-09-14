import addElement from './layout/addElement';
import getDimensions from './layout/getDimensions';
import addControls from './layout/addControls';
import resize from './layout/resize';

export default function layout() {
    const main = addElement('main', d3.select(this.element));
    getDimensions.call(this, main); // determine widths of DOM elements based on width of main container
    const controls = addElement('controls', main);
    addControls.call(this, controls);
    const timepoint = addElement('timepoint', main, 'h2');
    const charts = addElement('charts', main);

    window.addEventListener('resize', resize.bind(this));

    return {
        main,
        controls,
        timepoint,
        charts,
    };
}
