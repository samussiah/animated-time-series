import getDimensions from './plot/getDimensions';
import getLayout from './plot/getLayout';

import getXScale from './plot/getXScale';
import getYScale from './plot/getYScale';
import getColorScale from './plot/getColorScale';

import plotLines from './plot/plotLines';
import plotPoints from './plot/plotPoints';
import plotAnnotations from './plot/plotAnnotations';

import updateLines from './plot/updateLines';
import updatePoints from './plot/updatePoints';
import updateAnnotations from './plot/updateAnnotations';

export default function plot() {
    //this.summary.forEach((stratum) => {
    //    stratum.subset = stratum[1].slice(0, this.settings.timepoint + 1);
    //});

    const dimensions = getDimensions();

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
            for (const measure of this.summary) {
                updateLines.call(this, measure.lines, measure.scales);
                updatePoints.call(this, measure.points, measure.scales);
                updateAnnotations.call(this, measure.annotations, measure.scales);
            }
        }
    };

    // initialize time interval
    this.interval = d3.interval(() => {
        iterate.call(this);
    }, this.settings.speed);
}
