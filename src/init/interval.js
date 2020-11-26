import timepoint from './timepoint';
import updateLines from './update/lines';
import updatePoints from './update/points';
import updateLinesAggregate from './update/linesAggregate';
import updatePointsAggregate from './update/pointsAggregate';

export function iterate() {
    this.settings.timepoint++;
    if (this.settings.timepoint >= this.set.visit.length) this.settings.timepoint = 0;
    this.timepoint = timepoint.call(this);

    // Update each measure.
    this.group.measure.forEach((measure, key) => {
        updateLines.call(this, measure);
        updatePoints.call(this, measure);
        updateLinesAggregate.call(this, measure);
        updatePointsAggregate.call(this, measure);
    });
}

export default function interval() {
    const interval = d3.interval(() => {
        iterate.call(this);
    }, this.settings.speed);

    return interval;
}
