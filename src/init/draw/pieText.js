export default function pieText(measure) {
    const pieText = measure.containers.pieChart.gText
        .selectAll('text')
        .data(measure.pieData)
        .join('text')
        .attr('transform', (d) => `translate(${measure.arcLabel.centroid(d)})`)
        .each(function(d) {
            this._current = d;
        })
        .call((text) =>
            text
                .append('tspan')
                .attr('y', '-0.4em')
                .attr('font-weight', 'bold')
                .text((d, i) => (i === 0 ? 'Increase' : i === 1 ? 'No change' : 'Decrease'))
        )
        .call((text) =>
            text
                .append('tspan')
                .attr('x', 0)
                .attr('y', '0.7em')
                .attr('fill-opacity', 0.7)
                .text((d) => d3.format('.1%')(d.data))
        );

    return pieText;
}
