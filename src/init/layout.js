import addElement from '../layout/addElement';
import makeLegend from './layout/legend';

export default function layout(measure, key) {
    const keyClass = key.toLowerCase().replace(/[^a-z0-9_]/g, '-');

    // container
    const main = addElement('container', this.containers.charts);
    //.attr('width', this.settings.width)
    //.attr('height', this.settings.height);

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
        .attr('width', this.settings.widthTimeSeries)
        .attr('height', this.settings.height);
    /**/timeSeries.xAxis = addElement('x-axis', timeSeries.svg, 'g');
    /**/timeSeries.yAxis = addElement('y-axis', timeSeries.svg, 'g');
    /**/timeSeries.canvas = addElement('canvas', timeSeries.svg, 'g');
    /**//**/timeSeries.lines = addElement('lines', timeSeries.canvas, 'g');
    /**//**/timeSeries.points = addElement('points', timeSeries.canvas, 'g');
    /**//**/timeSeries.linesAggregate = addElement('lines-aggregate', timeSeries.canvas, 'g');
    /**//**/timeSeries.pointsAggregate = addElement('points-aggregate', timeSeries.canvas, 'g');

    // pie chart
    const pieChart = addElement('pie-chart', main).classed('atm-svg-container', true);
    pieChart.header = addElement('pie-chart__header', pieChart).text('Participant Breakdown');
    pieChart.svg = addElement('pie-chart__svg', pieChart, 'svg')
        .attr('width', this.settings.widthPieChart)
        .attr('height', this.settings.height);
    /**/pieChart.g = addElement('pie-chart__g', pieChart.svg, 'g')
    /**/    .attr(
    /**/        'transform',
    /**/        `translate(${this.settings.widthPieChart / 2},${this.settings.height / 2})`
    /**/    );
    /**//**/pieChart.gArcs = addElement('pie-chart__arcs', pieChart.g, 'g');
    /**//**/pieChart.gText = addElement('pie-chart__text', pieChart.g, 'g');

    return {
        main,
        header,
        legend,
        timeSeries,
        pieChart,
    };
}
