export default function pointsAggregate(measure) {
    measure.pointsAggregate
        .transition()
        .ease(d3.easeQuad)
        .duration((2 * this.settings.speed) / 5)
        .delay((2 * this.settings.speed) / 5)
        .attr('cx', measure.xScale(this.timepoint))
        .attr('cy', (d) => measure.yScale(d[this.visitIndex][1]))
        .attr('fill', (d, i) => measure.colorScale(d[this.visitIndex][1] - d[0][1]))
        .on('end', () => {
            if (this.visitIndex === 0) measure.containers.canvas.selectAll('.atm-clone').remove();
        });
    measure.pointsAggregate.clone().classed('atm-clone', true);
}
