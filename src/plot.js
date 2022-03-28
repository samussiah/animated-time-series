import getDimensions from './plot/getDimensions';
import getSvg from './plot/getSvg';

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
    console.log(this.settings.timepoint);
    this.summary.forEach((stratum) => {
        stratum.subset = stratum[1].slice(0, this.settings.timepoint + 1);
    });

    // layout
    const dimensions = getDimensions();
    const svg = getSvg(this.layout.charts, dimensions);

    // scales
    this.scales = {
        x: getXScale(this.set.visit, dimensions, svg),
        y: getYScale([0, d3.max(this.summary.tabular, (d) => d.value)], dimensions, svg),
        color: getColorScale(this.set.stratification),
    };

    // graphical objects
    const lines = plotLines.call(this, svg, this.summary, this.scales);
    const points = plotPoints.call(this, svg, this.summary, this.scales);
    const annotations = plotAnnotations.call(this, svg, this.summary, this.scales);

    // increment timepoint and update plot accordingly
    const iterate = function () {
        this.settings.timepoint++;

        if (this.settings.timepoint >= this.set.visit.length) {
            this.interval.stop();
            this.settings.timepoint = 0;
            console.log(this.settings.timepoint);
        } else {
            console.log(this.settings.timepoint);
            updateLines.call(this, lines, this.scales);
            updatePoints.call(this, points, this.scales);
            updateAnnotations.call(this, annotations, this.scales);
        }
    };

    // initialize time interval
    this.interval = d3.interval(() => {
        iterate.call(this);
    }, this.settings.speed);
}
