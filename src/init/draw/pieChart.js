export default function pieChart(measure) {
    const pieChart = measure.containers.pieChart.g
        .append('g')
        .selectAll('path')
        .data(measure.pieData)
        .join('path')
        .attr('d', measure.arc)
        .attr('fill', (d) => measure.pieColor(d.data))
        .attr('stroke', 'black')
        .attr('stroke-width', '2px')
        .style('opacity', 0.7);

    return pieChart;
}
