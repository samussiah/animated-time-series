import timepoint from './data/timepoint';

import getDimensions from './plot/getDimensions';
import getLayout from './plot/getLayout';

import getXScale from './plot/getXScale';
import getYScale from './plot/getYScale';
import getColorScale from './plot/getColorScale';

import addXAxis from './plot/addXAxis';
import addYAxis from './plot/addYAxis';
import addLegend from './plot/addLegend';

import plotLines from './plot/plotLines';
import plotPoints from './plot/plotPoints';
import plotCIs from './plot/plotCIs';
import plotAnnotations from './plot/plotAnnotations';

import updateLines from './plot/updateLines';
import updatePoints from './plot/updatePoints';
import updateCIs from './plot/updateCIs';
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
        const yValues = measure.tabular.map((d) => d.value);

        if (this.settings.displayCIs) {
            data.map((d) => d[1])
                .flat()
                .map((d) => d[1].stats[`${this.settings.aggregate}_ci`])
                .flat()
                .forEach((ci) => yValues.push(ci));
        }

        measure.scales = {
            x: xScale.copy(),
            y: getYScale(yValues, dimensions),
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
        if (this.settings.displayCIs)
            measure.CIs = plotCIs.call(this, layout.svg, data, measure.scales);
        if (this.settings.annotate)
            measure.annotations = plotAnnotations.call(this, layout.svg, data, measure.scales);
        else measure.legend = addLegend.call(this, layout.svg, measure.scales.color);
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
                if (this.settings.displayCIs) updateCIs.call(this, measure.CIs, measure.scales);
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
