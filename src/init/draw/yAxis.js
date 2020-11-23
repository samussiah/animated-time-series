export default function yAxis(measure) {
    return measure.layout.timeSeries.yAxis
        .attr('transform', `translate(${this.settings.margin.left},0)`)
        .call(d3.axisLeft(measure.yScale))
        .call((g) => g.select('.domain').remove())
        .call((g) =>
            g
                .append('g')
                .attr('stroke', 'currentColor')
                .attr('stroke-opacity', 0.1)
                .selectAll('line')
                .data(measure.yScale.ticks())
                .join('line')
                .attr('y1', (d) => 0.5 + measure.yScale(d))
                .attr('y2', (d) => 0.5 + measure.yScale(d))
                .attr('x1', 0)
                .attr(
                    'x2',
                    this.settings.width - this.settings.margin.right - this.settings.margin.left
                )
        );
}
