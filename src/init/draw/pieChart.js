export default function pieChart(measure) {
    const pieChart = measure.containers.pieChart.gArcs
        .selectAll('path')
        .data(measure.pieData, d => d.index)
        .join('path')
        .attr('d', measure.arc)
        .attr('fill', (d) => measure.pieColorScale(d.index))
        .attr('stroke', 'black')
        .attr('stroke-width', '2px')
        .style('opacity', 0.7)
        .each(function(d) {
            this._current = d;
        });

    return pieChart;
}
