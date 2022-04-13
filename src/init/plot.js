import getLayout from './getLayout';

import getXScale from './getXScale';
import getYScale from './getYScale';
import getColorScale from './getColorScale';

import addXAxis from './addXAxis';
import addYAxis from './addYAxis';
import addLegend from './addLegend';

import plotLines from './plotLines';
import plotPoints from './plotPoints';
import plotCIs from './plotCIs';
import plotAnnotations from './plotAnnotations';

export default function plot(measure) {
    const dimensions = this.settings.dimensions;

    // common scales (x, color)
    const xScale = getXScale(this.settings.xType, this.set[this.settings.xVar], dimensions);
    const colorScale = getColorScale(this.set.color);

    const data = measure[1];

    // layout
    const layout = getLayout.call(this, measure[0], dimensions);

    // y-scale
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
        layout.svg,
        measure.scales.x,
        dimensions,
        this.settings.xType,
        this.set,
        measure.visits
    );
    measure.yAxis = addYAxis(layout.svg, measure.scales.y, dimensions);

    // graphical objects
    measure.lines = plotLines.call(this, layout.svg, data, measure.scales);
    measure.points = plotPoints.call(this, layout.svg, data, measure.scales);
    if (this.settings.displayCIs)
        measure.CIs = plotCIs.call(this, layout.svg, data, measure.scales);
    if (this.settings.annotate)
        measure.annotations = plotAnnotations.call(this, layout.svg, data, measure.scales);
    else measure.legend = addLegend.call(this, layout.svg, measure.scales.color, dimensions);
}
