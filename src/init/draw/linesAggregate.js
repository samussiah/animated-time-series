export default function linesAggregate(measure) {
    const lines = measure.containers.timeSeries.linesAggregate
        .datum(measure.aggregate)
        .selectAll('line.atm-line-aggregate')
        .data(d3.pairs(measure.aggregate))
        .join('line')
        .classed('atm-line-aggregate', true)
        .attr('x1', (d, i) =>
            this.settings.x_type === 'ordinal'
                ? measure.xScale(this.data.visits[i]) + measure.xScale.bandwidth() / 2
                : measure.xScale(this.data.timepoints[i])
        )
        .attr('x2', (d, i) =>
            this.settings.x_type === 'ordinal'
                ? measure.xScale(this.data.visits[i]) + measure.xScale.bandwidth() / 2
                : measure.xScale(this.data.timepoints[i])
        )
        .attr('y1', (d) => measure.yScale(d[0][1]))
        .attr('y2', (d) => measure.yScale(d[0][1]))
        //.attr('stroke', (d) => measure.colorScale(d[1][1] - d[0][1]))
        .attr('stroke', (d) => {
            const change = d[1][1] - d[0][1];
            return this.settings.color_var === 'percent_change'
                ? measure.colorScale((change / d[0][1]) * 100)
                : measure.colorScale(change);
        })
        .attr('stroke-width', 3);

    return lines;
}
