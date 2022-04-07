import getDimensions from './plot/getDimensions';
import getLayout from './plot/getLayout';

import getXScale from './plot/getXScale';
import getYScale from './plot/getYScale';
import getColorScale from './plot/getColorScale';

import plotLines from './plot/plotLines';
import plotPoints from './plot/plotPoints';
import plotAnnotations from './plot/plotAnnotations';

import timepoint from './data/timepoint';
import updateLines from './plot/updateLines';
import updatePoints from './plot/updatePoints';
import updateAnnotations from './plot/updateAnnotations';

export default function plot() {
    //this.summary.forEach((stratum) => {
    //    stratum.subset = stratum[1].slice(0, this.settings.timepoint + 1);
    //});

    const dimensions = getDimensions(this.settings);

    // Iterate through measures.
    for (const measure of this.summary) {
        const data = measure[1];

        // layout
        const layout = getLayout.call(this, measure[0], dimensions);

        // scales
        const scales = {
            x: getXScale(this.set.visit, dimensions, layout.svg, measure.visits),
            y: getYScale([d3.min(measure.tabular, (d) => d.value), d3.max(measure.tabular, (d) => d.value)], dimensions, layout.svg),
            color: getColorScale(this.set.color),
        };
        measure.scales = scales;

        // graphical objects
        measure.lines = plotLines.call(this, layout.svg, data, scales);
        measure.points = plotPoints.call(this, layout.svg, data, scales);
        if (this.settings.annotate)
            measure.annotations = plotAnnotations.call(this, layout.svg, data, scales);
    }

    // increment timepoint and update plot accordingly
    const iterate = function () {
        this.settings.timepoint++;

        if (this.settings.timepoint >= this.set.visit.length) {
            this.interval.stop();
            this.settings.timepoint = 0;
        } else {
            this.timepoint = timepoint(this.settings.timepoint, this.set);

            for (const measure of this.summary) {
                updateLines.call(this, measure.lines, measure.scales);
                updatePoints.call(this, measure.points, measure.scales);
                if (this.settings.annotate)
                    updateAnnotations.call(this, measure.annotations, measure.scales);
            }
        }
    };

    // initialize time interval
    this.interval = d3.interval(() => {
        iterate.call(this);
    }, this.settings.speed);
}
