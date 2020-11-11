import addElement from './layout/addElement';
import getDimensions from './layout/getDimensions';
import addControls from './layout/addControls';
import resize from './layout/resize';

export default function layout() {
    const main = addElement('main', d3.select(this.element));
    getDimensions.call(this, main); // determine widths of DOM elements based on width of main container
    const controls = addElement('controls', main);
    const timepoint = addElement('timepoint', controls, 'span');
    addControls.call(this, controls);
    const charts = addElement('charts', main);
    const footnote = addElement('footnote', main, 'small');
    const footnotes = [
        `<sup>1</sup> The color of points represents ${this.settings.color_var.replace(
            '_',
            ' '
        )} from baseline.`,
        `<sup>2</sup> The color of lines represents ${this.settings.color_var.replace(
            '_',
            ' '
        )} from the previous timepoint.`,
    ];
    if (this.settings.y_limits !== null)
        footnotes.push(
            `<sup>*</sup> To mitigate the effect of outliers, the range of the y-axis encompasses the ${this.settings.y_limits
                .map((limit) => `${limit}th`)
                .join(' through ')} quantile of the results.`
        );
    footnote.html(footnotes.join('<br>'));

    window.addEventListener('resize', resize.bind(this));

    return {
        main,
        controls,
        timepoint,
        charts,
    };
}
