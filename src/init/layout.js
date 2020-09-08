import addElement from '../layout/addElement';

export default function layout(key) {
    const keyClass = key.toLowerCase().replace(/[^a-z0-9_]/g, '-');

    // container
    const main = addElement('container', this.containers.main)
        .attr('width', this.settings.width)
        .attr('height', this.settings.height);

    // header
    const header = addElement('header', main, 'h3').text(key);

    // SVG
    const svg = addElement('svg', main, 'svg')
        .attr('width', this.settings.width)
        .attr('height', this.settings.height);

    const xAxis = addElement('x-axis', svg, 'g');
    const yAxis = addElement('y-axis', svg, 'g');
    const canvas = addElement('canvas', svg, 'g');
    const lines = addElement('lines', canvas, 'g');
    const points = addElement('points', canvas, 'g');
    const linesAggregate = addElement('lines-aggregate', canvas, 'g');
    const pointsAggregate = addElement('points-aggregate', canvas, 'g');

    return {
        main,
        svg,
        xAxis,
        yAxis,
        canvas,
        points,
        lines,
        pointsAggregate,
        linesAggregate,
    };
}
