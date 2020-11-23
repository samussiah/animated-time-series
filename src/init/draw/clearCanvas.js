export default function clearCanvas(measure) {
    measure.layout.timeSeries.xAxis.selectAll('*').remove();
    measure.layout.timeSeries.yAxis.selectAll('*').remove();
    measure.layout.timeSeries.lines.selectAll('*').remove();
    measure.layout.timeSeries.points.selectAll('*').remove();
    measure.layout.timeSeries.pointsAggregate.selectAll('*').remove();
    measure.layout.timeSeries.linesAggregate.selectAll('*').remove();
}
