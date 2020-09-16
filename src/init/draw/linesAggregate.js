export default function linesAggregate(measure) {
    const lines = measure.containers.timeSeries.linesAggregate
        .selectAll('line.atm-line-aggregate')
        .data(d3.pairs(measure.aggregate))
        .join('line')
        .classed('atm-line-aggregate', true)
        .attr('x1', (d, i) => measure.xScale(this.data.timepoints[i]))
        .attr('x2', (d, i) => measure.xScale(this.data.timepoints[i]))
        .attr('y1', (d) => measure.yScale(d[0][1]))
        .attr('y2', (d) => measure.yScale(d[0][1]))
        .attr('stroke', (d) => measure.colorScale(d[1][1] - d[0][1]))
        .attr('stroke-width', 3);

    return lines;
}
