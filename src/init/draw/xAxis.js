export default function xAxis(measure) {
    return measure.containers.timeSeries.xAxis
        .attr('transform', `translate(0,${this.settings.height - this.settings.margin.bottom})`)
        .call(d3.axisBottom(measure.xScale).ticks(this.settings.width / 80))
        .call((g) =>
            g
                .append('text')
                .attr('x', (this.settings.width - this.settings.margin.left) / 2)
                .attr('y', this.settings.margin.bottom / 2 + 4)
                .attr('fill', 'currentColor')
                .attr('text-anchor', 'center')
                .attr('alignment-baseline', 'hanging')
                .text('Study Day')
        );
}
