import timepoint from './timepoint';
import updateLines from './update/lines';
import updatePoints from './update/points';
import updateLinesAggregate from './update/linesAggregate';
import updatePointsAggregate from './update/pointsAggregate';

export default function update() {
    this.timepoint = timepoint.call(this);
    this.group.measure.forEach((measure, key) => {
        updateLines.call(this, measure);
        updatePoints.call(this, measure);
        updateLinesAggregate.call(this, measure);
        updatePointsAggregate.call(this, measure);
    });
}
