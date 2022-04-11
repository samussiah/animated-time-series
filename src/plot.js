import getDimensions from './plot/getDimensions';
import getLayout from './plot/getLayout';

import getXScale from './plot/getXScale';
import getYScale from './plot/getYScale';
import getColorScale from './plot/getColorScale';

import addXAxis from './plot/addXAxis';
import addYAxis from './plot/addYAxis';
//import addLegend from './plot/addLegend';
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
    const xScale = getXScale(this.settings.xType, this.set[this.settings.xVar], dimensions); // TODO: pass set in here
    const colorScale = getColorScale(this.set.color);

    // Iterate through measures.
    for (const measure of this.summary) {
        const data = measure[1];

        // layout
        const layout = getLayout.call(this, measure[0], dimensions);

        // scales
        measure.scales = {
            x: xScale.copy(),
            y: getYScale(
                measure.tabular.map((d) => d.value),
                dimensions
            ),
            color: colorScale.copy(),
        };

        // axes
        measure.xAxis = addXAxis(
            this.settings.xType,
            layout.svg,
            this.set,
            measure.scales.x,
            measure.visits
        );
        measure.yAxis = addYAxis(layout.svg, measure.scales.y);

        // graphical objects
        measure.lines = plotLines.call(this, layout.svg, data, measure.scales);
        measure.points = plotPoints.call(this, layout.svg, data, measure.scales);
        if (this.settings.annotate)
            measure.annotations = plotAnnotations.call(this, layout.svg, data, measure.scales);
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
