import clearCanvas from './draw/clearCanvas';
import drawXAxis from './draw/xAxis';
import drawYAxis from './draw/yAxis';
import drawLines from './draw/lines';
import drawPoints from './draw/points';
import drawLinesAggregate from './draw/linesAggregate';
import drawPointsAggregate from './draw/pointsAggregate';

export default function draw(measure) {
    clearCanvas.call(this, measure);
    measure.xAxis = drawXAxis.call(this, measure);
    measure.yAxis = drawYAxis.call(this, measure);
    measure.lines = drawLines.call(this, measure);
    const {groups, points} = drawPoints.call(this, measure);
    measure.groups = groups;
    measure.points = points;
    measure.linesAggregate = drawLinesAggregate.call(this, measure);
    measure.pointsAggregate = drawPointsAggregate.call(this, measure);
}
