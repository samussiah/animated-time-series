export default function clearCanvas(measure) {
    measure.containers.timeSeries.xAxis.selectAll('*').remove();
    measure.containers.timeSeries.yAxis.selectAll('*').remove();
    measure.containers.timeSeries.lines.selectAll('*').remove();
    measure.containers.timeSeries.points.selectAll('*').remove();
    measure.containers.timeSeries.pointsAggregate.selectAll('*').remove();
    measure.containers.timeSeries.linesAggregate.selectAll('*').remove();
    measure.containers.pieChart.gArcs.selectAll('*').remove();
    measure.containers.pieChart.gText.selectAll('*').remove();
}
