export default function attr(measure, points) {
    points
        .attr(
            'cx',
            (d) =>
                measure.xScale(d[this.settings.x_var]) +
                (this.settings.x_type === 'ordinal' ? measure.xScale.bandwidth() / 2 : 0)
        )
        .attr('cy', (d) => measure.yScale(d[this.settings.y_var]))
        .attr('r', (d) => (d.visit_order <= this.timepoint.visit_order ? 2 : 0))
        .attr('fill', (d) => measure.colorScale(d[this.settings.color_var]))
        .attr('fill-opacity', 0.25)
        .attr('stroke', (d) => measure.colorScale(d[this.settings.color_var]))
        .attr('stroke-opacity', 0.5);
}
