export default function pointsAggregate(measure) {
    if (this.timepoint.index > 0)
        measure.pointsAggregate
            .transition()
            .ease(d3.easeQuad)
            .duration((2 * this.settings.speed) / 5)
            .delay((2 * this.settings.speed) / 5)
            .attr(
                'cx',
                this.settings.x_type === 'ordinal'
                    ? measure.xScale(this.timepoint.visit) + measure.xScale.bandwidth() / 2
                    : measure.xScale(this.timepoint.day)
            )
            .attr('cy', (d) => measure.yScale(d[this.timepoint.index][1]))
            .attr('fill', (d, i) =>
                measure.colorScale(
                    d[this.timepoint.index][this.settings.color_var === 'change' ? 2 : 3]
                )
            );
    else
        measure.pointsAggregate
            .attr(
                'cx',
                this.settings.x_type === 'ordinal'
                    ? measure.xScale(this.timepoint.visit) + measure.xScale.bandwidth() / 2
                    : measure.xScale(this.timepoint.day)
            )
            .attr('cy', (d) => measure.yScale(d[0][1]))
            .attr('fill', measure.colorScale(0));

    measure.pointsAggregate.clone().classed('atm-clone', true);

    if (this.timepoint.index === 0) {
        const delay = this.settings.speed / this.set.visit.length;
        const clones = measure.layout.timeSeries.canvas.selectAll('.atm-clone');
        clones
            .transition()
            .duration(delay)
            .delay((d, i) => delay * i)
            .attr('fill-opacity', 0)
            .attr('stroke-opacity', 0)
            .remove();
    }
}
