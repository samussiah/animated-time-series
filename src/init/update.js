import updateLines from './update/lines';
import updatePoints from './update/points';
import updateLinesAggregate from './update/linesAggregate';
import updatePointsAggregate from './update/pointsAggregate';
import updatePieChart from './update/pieChart';
import updatePieText from './update/pieText';

export default function update(forward = true, step = false) {
    this.visitIndex = forward === true
        ? (
            this.visitIndex >= this.data.visits.length - 1
                ? 0
                : this.visitIndex + 1
        ) : Math.max(this.visitIndex - 1, 0);

    // Pause at end before looping.
    if (this.visitIndex === this.data.visits.length - 1) {
        this.interval.stop();
        d3.timeout((elapsed) => {
            this.interval = d3.interval(() => {
                update.call(this);
            }, this.settings.speed);
        }, this.settings.loop_time);
    }

    // Pause at start.
    if (this.visitIndex === 0) {
        this.interval.stop();
        d3.timeout((elapsed) => {
            this.interval = d3.interval(() => {
                update.call(this);
            }, this.settings.speed);
        }, 1000);
    }

    // Update current visit and timepoint and transition visit text.
    this.visit = this.data.visits[this.visitIndex];
    this.timepoint = this.data.timepoints[this.visitIndex];
    this.containers.timepoint
        .transition()
        .delay(this.settings.speed / 2)
        .text(this.visit);

    // Update each measure.
    this.data.groups.measure.forEach((measure, key) => {
        updateLines.call(this, measure);
        updatePoints.call(this, measure);
        updateLinesAggregate.call(this, measure);
        updatePointsAggregate.call(this, measure);

        measure.participantBreakdown = measure.pct[this.visitIndex][1];
        const pieData = measure.pieGenerator(measure.participantBreakdown);
        measure.pieData.forEach((d,i) => {
            Object.assign(d, pieData[i]);
        });

        updatePieChart.call(this, measure);
        updatePieText.call(this, measure);
    });

    if (step === true)
        this.interval.stop();
}
