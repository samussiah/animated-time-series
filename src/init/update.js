import updateLines from './update/lines';
import updatePoints from './update/points';
import updateLinesAggregate from './update/linesAggregate';
import updatePointsAggregate from './update/pointsAggregate';

export default function update() {
    this.visitIndex = this.visitIndex >= this.data.visits.length - 1 ? 0 : this.visitIndex + 1;
    this.visit = this.data.visits[this.visitIndex];
    this.timepoint = this.data.timepoints[this.visitIndex];
    this.containers.timepoint
        .transition()
        .delay(this.settings.speed / 2)
        .text(this.visit);

    this.data.groups.measure.forEach((measure, key) => {
        updateLines.call(this, measure);
        updatePoints.call(this, measure);
        updateLinesAggregate.call(this, measure);
        updatePointsAggregate.call(this, measure);
    });
}
