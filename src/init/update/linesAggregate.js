export default function linesAggregate(measure) {
    measure.linesAggregate
        .filter((d, i) => i === this.visitIndex - 1)
        .transition()
        .duration((2 * this.settings.speed) / 5)
        .delay((1 * this.settings.speed) / 5)
        .attr('x2', (d, i) => measure.xScale(this.timepoint))
        .attr('y2', (d) => measure.yScale(d[1][1]));
}
