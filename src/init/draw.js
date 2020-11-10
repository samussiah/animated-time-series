import clearCanvas from './draw/clearCanvas';
import drawXAxis from './draw/xAxis';
import drawYAxis from './draw/yAxis';
import drawLines from './draw/lines';
import drawPoints from './draw/points';
import drawLinesAggregate from './draw/linesAggregate';
import drawPointsAggregate from './draw/pointsAggregate';
import drawPieChart from './draw/pieChart';
import drawPieText from './draw/pieText';

export default function draw(measure) {
    clearCanvas.call(this, measure);
    measure.xAxis = drawXAxis.call(this, measure);
    measure.yAxis = drawYAxis.call(this, measure);
    measure.lines = drawLines.call(this, measure);
    measure.points = drawPoints.call(this, measure);
    measure.linesAggregate = drawLinesAggregate.call(this, measure);
    measure.pointsAggregate = drawPointsAggregate.call(this, measure);
    //measure.arc = d3
    //    .arc()
    //    //.innerRadius(this.settings.widthPieChart/2 - 25)
    //    .innerRadius(0)
    //    .outerRadius(this.settings.widthPieChart / 2 - 4);
    //measure.arcLabel = d3
    //    .arc()
    //    .innerRadius((this.settings.widthPieChart / 2 - 4) * 0.7)
    //    .outerRadius((this.settings.widthPieChart / 2 - 4) * 0.7);

    //measure.participantBreakdown = measure.pct[0][1];
    //measure.pieColor = d3
    //    .scaleOrdinal()
    //    .domain(measure.participantBreakdown)
    //    .range(['#bcdf27', '#21918d', '#482575']);
    //measure.pieGenerator = d3
    //    .pie()
    //    .value((d) => d)
    //    .sort(null);
    //measure.pieData = measure.pieGenerator(measure.participantBreakdown);

    //measure.pieChart = drawPieChart.call(this, measure);
    //measure.pieText = drawPieText.call(this, measure);
}
