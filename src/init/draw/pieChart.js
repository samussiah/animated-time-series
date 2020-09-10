export default function pieChart(measure) {
    measure.containers.pieChart.svg
        .append('circle')
        .attr('cx', this.settings.widthPieChart/2)
        .attr('cy', this.settings.height/2)
        .attr('r', this.settings.widthPieChart/2 - 50)
        .attr('stroke-width', 25)
        .attr('stroke', 'steelblue')
        .attr('fill', 'white');
}
