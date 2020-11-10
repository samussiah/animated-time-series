export default function pointsAggregate(measure) {
    const points = measure.containers.timeSeries.pointsAggregate
        .append('circle')
        .datum(measure.aggregate)
        .classed('atm-point-aggregate', true)
        .attr('cx',
            this.settings.x_type === 'ordinal'
                ? measure.xScale(this.visit) + measure.xScale.bandwidth()/2
                : measure.xScale(this.timepoint)
        )
        .attr('cy', (d) => measure.yScale(d[0][1]))
        .attr('r', 4)
        .attr('fill', measure.colorScale(0))
        .attr('fill-opacity', 1)
        .attr('stroke', 'black')
        .attr('stroke-opacity', 1);

    return points;
}
