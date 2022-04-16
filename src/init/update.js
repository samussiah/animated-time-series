import getTimepoint from './getTimepoint';

import updateLines from './update/lines';
import updatePoints from './update/points';
import updateCIs from './update/CIs';
import updateAnnotations from './update/annotations';

import plot from './plot';

export default function update(measure) {
    this.settings.timepoint++;

    if (this.settings.timepoint >= this.data.set.visit.length) {
        this.interval.stop();

        d3.timeout(() => {
            this.settings.timepoint = 0;
            this.measureIndex++;
            if (this.measureIndex < this.summary.length) {
                this.measure = this.summary[this.measureIndex];
                plot.call(this, this.measure);
                this.interval = d3.interval(() => {
                    iterate.call(this, this.measure);
                }, this.settings.speed);
            }
        }, this.settings.pause);
    } else {
        this.timepoint = getTimepoint(this.settings.timepoint, this.data.set);

        updateLines.call(this, measure.lines, measure.scales);
        updatePoints.call(this, measure.points, measure.scales);
        if (this.settings.displayCIs)
            updateCIs.call(this, measure.CIs, measure.scales);
        if (this.settings.annotate)
            updateAnnotations.call(this, measure.annotations, measure.scales);
    }
}
