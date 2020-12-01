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
    const svg = this.util
        .addElement('time-series__svg', main, 'svg')
        .attr('width', this.settings.width)
        .attr('height', this.settings.height);
    /**/ const xAxis = this.util.addElement('x-axis', svg, 'g');
    /**/ const yAxis = this.util.addElement('y-axis', svg, 'g');
    /**/ const canvas = this.util.addElement('canvas', svg, 'g');
    // TODO: figure out why this margin variable is necessary... so the points aren't cut off at the edges of the clip-path?
    const margin = 6;
    /**/ /**/ const clipPath = this.util
        .addElement('clip-path', canvas, 'clipPath')
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
    /**/ /**/ const lines = this.util
        .addElement('lines', canvas, 'g')
        .attr('clip-path', `url(#${keyClass})`);
    /**/ /**/ const points = this.util
        .addElement('points', canvas, 'g')
        .attr('clip-path', `url(#${keyClass})`);
    /**/ /**/ const linesAggregate = this.util
        .addElement('lines-aggregate', canvas, 'g')
        .attr('clip-path', `url(#${keyClass})`);
    /**/ /**/ const pointsAggregate = this.util
        .addElement('points-aggregate', canvas, 'g')
        .attr('clip-path', `url(#${keyClass})`);

    return {
        main,
        header,
        legend,
        svg,
        xAxis,
        yAxis,
        canvas,
        clipPath,
        lines,
        points,
        linesAggregate,
        pointsAggregate,
    };
}
