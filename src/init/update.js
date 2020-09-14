import updateLines from './update/lines';
import updatePoints from './update/points';
import updateLinesAggregate from './update/linesAggregate';
import updatePointsAggregate from './update/pointsAggregate';
import updatePieChart from './update/pieChart';
import updatePieText from './update/pieText';

export default function update() {
    this.visitIndex = this.visitIndex >= this.data.visits.length - 1 ? 0 : this.visitIndex + 1;

    // not sure why this works
    if (this.visitIndex === this.data.visits.length - 1) {
        this.interval.stop();
        d3.timeout((elapsed) => {
            this.interval = d3.interval(() => {
                update.call(this);
            }, this.settings.speed);
        }, this.settings.loop_time);
    }

    if (this.visitIndex === 0) {
        this.interval.stop();
        d3.timeout((elapsed) => {
            this.interval = d3.interval(() => {
                update.call(this);
            }, this.settings.speed);
        }, 1000);
    }

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

        measure.participantBreakdown = measure.pct[this.visitIndex][1];
        measure.pieColor = d3
            .scaleOrdinal()
            .domain(measure.participantBreakdown)
            .range(['#bcdf27', '#21918d', '#482575']);
        measure.pieData = measure.pieGenerator(measure.participantBreakdown);

        updatePieChart.call(this, measure);
        updatePieText.call(this, measure);
    });
}
