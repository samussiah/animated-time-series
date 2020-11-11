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
            title:
                this.settings.color_var === 'change'
                    ? 'Change'
                    : 'Percent Change <tspan dy = "-5" style = "font-size: 10px; font-weight: lighter">1 2</tspan>',
            width: 275,
        })
    );

    // time series
    const timeSeries = addElement('time-series', main).classed('atm-svg-container', true);
    timeSeries.svg = addElement('time-series__svg', timeSeries, 'svg')
        .attr('width', this.settings.width)
        .attr('height', this.settings.height);
    /**/ timeSeries.xAxis = addElement('x-axis', timeSeries.svg, 'g');
    /**/ timeSeries.yAxis = addElement('y-axis', timeSeries.svg, 'g');
    /**/ timeSeries.canvas = addElement('canvas', timeSeries.svg, 'g');
    const margin = 6;
    /**/ /**/ timeSeries.clipPath = addElement('clip-path', timeSeries.canvas, 'clipPath')
        .attr('id', keyClass)
        .append('rect')
        .attr('x', this.settings.margin.left - margin)
        .attr('y', this.settings.margin.top)
        .attr(
            'width',
            this.settings.width -
                this.settings.margin.left -
                this.settings.margin.right +
                margin * 2
        )
        .attr(
            'height',
            this.settings.height - this.settings.margin.top - this.settings.margin.bottom
        );
    /**/ /**/ timeSeries.lines = addElement('lines', timeSeries.canvas, 'g').attr(
        'clip-path',
        `url(#${keyClass})`
    );
    /**/ /**/ timeSeries.points = addElement('points', timeSeries.canvas, 'g').attr(
        'clip-path',
        `url(#${keyClass})`
    );
    /**/ /**/ timeSeries.linesAggregate = addElement(
        'lines-aggregate',
        timeSeries.canvas,
        'g'
    ).attr('clip-path', `url(#${keyClass})`);
    /**/ /**/ timeSeries.pointsAggregate = addElement(
        'points-aggregate',
        timeSeries.canvas,
        'g'
    ).attr('clip-path', `url(#${keyClass})`);

    return {
        main,
        header,
        legend,
        timeSeries,
    };
}
