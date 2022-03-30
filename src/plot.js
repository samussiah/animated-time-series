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

    const dimensions = getDimensions();

    // Iterate through measures.
    for (const measure of this.summary) {
        const data = measure[1];

        // layout
        const layout = getLayout.call(this, measure[0], dimensions);

        // scales
        const scales = {
            x: getXScale(this.set.visit, dimensions, layout.svg),
            y: getYScale([0, d3.max(measure.tabular, (d) => d.value)], dimensions, layout.svg),
            color: getColorScale(this.set.stratification),
        };
        measure.scales = scales;

        // graphical objects
        const lines = plotLines.call(this, layout.svg, data, scales);
        const points = plotPoints.call(this, layout.svg, data, scales);
        const annotations = plotAnnotations.call(this, layout.svg, data, scales);

        measure.lines = lines;
        measure.points = points;
        measure.annotations = annotations;
    }


    // increment timepoint and update plot accordingly
    const iterate = function () {
        this.settings.timepoint++;

        if (this.settings.timepoint >= this.set.visit.length) {
            this.interval.stop();
            this.settings.timepoint = 0;
        } else {
            this.timepoint = timepoint(this.settings.timepoint, this.set);
            console.log(this.timepoint);

            // TODO: handle measures with missing data at certain visits.
            //   - use actual timepoint / visit value rather than index
            for (const measure of this.summary) {
                //if (measure.tabular.map(d => d.visit).includes(this.timepoint.visit)) {
                    updateLines.call(this, measure.lines, measure.scales);
                    updatePoints.call(this, measure.points, measure.scales);
                    updateAnnotations.call(this, measure.annotations, measure.scales);
                //}
            }
        }
    };

    // initialize time interval
    this.interval = d3.interval(() => {
        iterate.call(this);
    }, this.settings.speed);
}
