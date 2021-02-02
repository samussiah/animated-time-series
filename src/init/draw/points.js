export default function points(measure) {
    const groups = measure.layout.points
        .selectAll('g')
        .data(measure.ids, (d) => d[0])
        .join('g');

    const points = groups
        .selectAll('.atm-circle')
        .data(d => d[1])
        .join('circle')
        .classed('atm-circle', true)
        .attr(
            'cx',
            (d) =>
                measure.xScale(d[this.settings.x_var]
                    //this.util.getValue(d[1], 'visit', this.timepoint.visit, this.settings.x_var)
                ) + (this.settings.x_type === 'ordinal' ? measure.xScale.bandwidth() / 2 : 0)
        )
        .attr('cy', (d) =>
            measure.yScale(d[this.settings.y_var]
                //this.util.getValue(d[1], 'visit', this.timepoint.visit, this.settings.y_var)
            )
        )
        .attr('r', d => d.visit === this.timepoint.visit ? 2 : 0)
        .attr('fill', d => measure.colorScale(d[this.settings.color_var]))
        .attr('fill-opacity', 0.25)
        .attr('stroke', d => measure.colorScale(d[this.settings.color_var]))
        .attr('stroke-opacity', 0.5);

    return {
        groups,
        points,
    };
}
