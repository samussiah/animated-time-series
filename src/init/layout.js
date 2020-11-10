import addElement from '../layout/addElement';
import makeLegend from './layout/legend';

export default function layout(measure, key) {
    const keyClass = key.toLowerCase().replace(/[^a-z0-9_]/g, '-');

    // container
    const main = addElement('container', this.containers.charts);

    // header
    const header = addElement('header', main, 'h3').text(key);

    // legend
    const legend = addElement('legend', main);
    legend.node().appendChild(
        makeLegend({
            color: measure.colorScale,
            title: 'Change from Baseline',
            width: 275,
        })
    );

    // time series
    const timeSeries = addElement('time-series', main).classed('atm-svg-container', true);
    timeSeries.svg = addElement('time-series__svg', timeSeries, 'svg')
        .attr('width', this.settings.width)
        .attr('height', this.settings.height);
    /**/timeSeries.xAxis = addElement('x-axis', timeSeries.svg, 'g');
    /**/timeSeries.yAxis = addElement('y-axis', timeSeries.svg, 'g');
    /**/timeSeries.canvas = addElement('canvas', timeSeries.svg, 'g');
    /**//**/timeSeries.lines = addElement('lines', timeSeries.canvas, 'g');
    /**//**/timeSeries.points = addElement('points', timeSeries.canvas, 'g');
    /**//**/timeSeries.linesAggregate = addElement('lines-aggregate', timeSeries.canvas, 'g');
    /**//**/timeSeries.pointsAggregate = addElement('points-aggregate', timeSeries.canvas, 'g');

    return {
        main,
        header,
        legend,
        timeSeries,
    };
}
