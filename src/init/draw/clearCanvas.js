export default function clearCanvas(measure) {
    measure.layout.xAxis.selectAll('*').remove();
    measure.layout.yAxis.selectAll('*').remove();
    measure.layout.lines.selectAll('*').remove();
    measure.layout.points.selectAll('*').remove();
    measure.layout.pointsAggregate.selectAll('*').remove();
    measure.layout.linesAggregate.selectAll('*').remove();
}
