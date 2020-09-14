export default function clearCanvas(measure) {
    measure.containers.xAxis.selectAll('*').remove();
    measure.containers.yAxis.selectAll('*').remove();
    measure.containers.lines.selectAll('*').remove();
    measure.containers.points.selectAll('*').remove();
    measure.containers.pointsAggregate.selectAll('*').remove();
    measure.containers.linesAggregate.selectAll('*').remove();
    measure.containers.pieChart.g.selectAll('*').remove();
}
