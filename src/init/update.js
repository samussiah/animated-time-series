import getTimepoint from './getTimepoint';

import updateLines from './update/lines';
import updatePoints from './update/points';
import updateCIs from './update/CIs';
import updateAnnotations from './update/annotations';

import getMeasure from './getMeasure';
import layout from './layout';
import plot from './plot';

export default function update(measure) {
    this.settings.timepoint++;

    if (this.settings.timepoint >= this.data.set.visit.length) {
        this.interval.stop();
        this.settings.measureIndex++;

        d3.timeout(() => {
            this.settings.timepoint = 0;
            this.timepoint = getTimepoint(this.settings.timepoint, this.data.set);

            if (this.settings.measureIndex < this.data.set.measure.length) {
                this.measure = getMeasure(this.data.nested, this.scales, this.settings);

                this.measure.layout = layout.call(this, this.measure);
                this.measure.layout.mainTransition.on('end', () => {
                    this.measure.layout.transitionEnd();
                    plot.call(this, this.measure);

                    d3.timeout(() => {
                        // initialize time interval
                        this.interval = d3.interval(() => {
                            update.call(this, this.measure);
                        }, this.settings.speed);
                    }, this.settings.speed * 2);
                });
            }
        }, this.settings.pause);
    } else {
        this.timepoint = getTimepoint(this.settings.timepoint, this.data.set);

        updateLines.call(this, measure.lines, measure.scales);
        updatePoints.call(this, measure.points, measure.scales);
        if (this.settings.displayCIs) updateCIs.call(this, measure.CIs, measure.scales);
        if (this.settings.annotate)
            updateAnnotations.call(this, measure.annotations, measure.scales);
    }
}
