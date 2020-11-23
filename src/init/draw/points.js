export default function points(measure) {
    const points = measure.layout.timeSeries.points
        .selectAll('circle')
        .data(measure.ids, (d) => d[0])
        .join('circle')
        .attr(
            'cx',
            (d) =>
                measure.xScale(this.util.getValue(d[1], 'visit', this.timepoint.visit, this.settings.x_var)) +
                (this.settings.x_type === 'ordinal' ? measure.xScale.bandwidth() / 2 : 0)
        )
        .attr('cy', (d) =>
            measure.yScale(this.util.getValue(d[1], 'visit', this.timepoint.visit, this.settings.y_var))
        )
        .attr('r', 1)
        .attr('fill', measure.colorScale(0))
        .attr('fill-opacity', 0.25)
        .attr('stroke', measure.colorScale(0))
        .attr('stroke-opacity', 0.5);

    return points;
}
