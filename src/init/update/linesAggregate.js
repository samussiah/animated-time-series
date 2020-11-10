export default function linesAggregate(measure) {
    const main = this;

    // TODO: get aggregate lines working with an ordinal time scale
    measure.linesAggregate
        .filter((d, i) => i === this.visitIndex - 1)
        .transition()
        .duration((2 * this.settings.speed) / 5)
        .delay((1 * this.settings.speed) / 5)
        .attr('x2', (d, i) => measure.xScale(this.timepoint))
        .attr('y2', (d) => measure.yScale(d[1][1]));

    if (this.visitIndex === 0) {
        const delay = this.settings.speed / this.data.visits.length;
        measure.linesAggregate
            .transition()
            .duration(delay)
            .delay((d, i) => this.settings.speed - delay * i)
            .attr('x2', function () {
                return this.getAttribute('x1');
            })
            .attr('y2', function () {
                return this.getAttribute('y1');
            });
    }
}
