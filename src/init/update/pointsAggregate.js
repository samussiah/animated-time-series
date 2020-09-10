export default function pointsAggregate(measure) {
    if (this.visitIndex > 0)
        measure.pointsAggregate
            .transition()
            .ease(d3.easeQuad)
            .duration((2 * this.settings.speed) / 5)
            .delay((2 * this.settings.speed) / 5)
            .attr('cx', measure.xScale(this.timepoint))
            .attr('cy', (d) => measure.yScale(d[this.visitIndex][1]))
            .attr('fill', (d, i) => measure.colorScale(d[this.visitIndex][1] - d[0][1]));
    else
        measure.pointsAggregate
            .attr('cx', measure.xScale(this.timepoint))
            .attr('cy', (d) => measure.yScale(d[0][1]))
            .attr('fill', measure.colorScale(0));

    measure.pointsAggregate.clone().classed('atm-clone', true);

    if (this.visitIndex === 0) {
        const delay = this.settings.speed/this.data.visits.length;
        const clones = measure.containers.canvas.selectAll('.atm-clone');
        clones
            .transition()
            .duration(delay)
            .delay((d,i) => delay*i)
            .attr('fill-opacity', 0)
            .attr('stroke-opacity', 0)
            .remove();
    }
}
