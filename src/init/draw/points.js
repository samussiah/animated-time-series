export default function points(measure) {
    const points = measure.containers.points
        .selectAll('circle')
        .data(measure.ids, (d) => d[0])
        .join('circle')
        .attr('cx', (d) => measure.xScale(this.util.getValue(d[1], 'visit', this.visit, 'day')))
        .attr('cy', (d) => measure.yScale(this.util.getValue(d[1], 'visit', this.visit, 'result')))
        .attr('r', 1)
        .attr('fill', measure.colorScale(0))
        .attr('fill-opacity', 0.25)
        .attr('stroke', measure.colorScale(0))
        .attr('stroke-opacity', 0.5)
        .style('display', (d) => (this.util.getDatum(d[1], 'visit', this.visit) ? null : 'none'));

    return points;
}
