import makeLegend from './layout/legend';

export default function layout(measure, key) {
    const keyClass = key.toLowerCase().replace(/[^a-z0-9_]/g, '-');

    // container
    const main = this.util.addElement('container', this.layout.charts);

    // header
    const header = this.util.addElement('header', main, 'h3').text(key);

    // legend
    const legend = this.util.addElement('legend', main);
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
    const timeSeries = this.util.addElement('time-series', main).classed('atm-svg-container', true);
    timeSeries.svg = this.util
        .addElement('time-series__svg', timeSeries, 'svg')
        .attr('width', this.settings.width)
        .attr('height', this.settings.height);
    /**/ timeSeries.xAxis = this.util.addElement('x-axis', timeSeries.svg, 'g');
    /**/ timeSeries.yAxis = this.util.addElement('y-axis', timeSeries.svg, 'g');
    /**/ timeSeries.canvas = this.util.addElement('canvas', timeSeries.svg, 'g');
    const margin = 6;
    /**/ /**/ timeSeries.clipPath = this.util
        .addElement('clip-path', timeSeries.canvas, 'clipPath')
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
    /**/ /**/ timeSeries.lines = this.util
        .addElement('lines', timeSeries.canvas, 'g')
        .attr('clip-path', `url(#${keyClass})`);
    /**/ /**/ timeSeries.points = this.util
        .addElement('points', timeSeries.canvas, 'g')
        .attr('clip-path', `url(#${keyClass})`);
    /**/ /**/ timeSeries.linesAggregate = this.util
        .addElement('lines-aggregate', timeSeries.canvas, 'g')
        .attr('clip-path', `url(#${keyClass})`);
    /**/ /**/ timeSeries.pointsAggregate = this.util
        .addElement('points-aggregate', timeSeries.canvas, 'g')
        .attr('clip-path', `url(#${keyClass})`);

    return {
        main,
        header,
        legend,
        timeSeries,
    };
}
