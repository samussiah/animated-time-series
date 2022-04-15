import addCanvas from './layout/canvas';
import addXAxis from './layout/xAxis';
import addYAxis from './layout/yAxis';
import addLegend from './layout/legend';

// TODO: finish refactoring
export default function layout(measure) {
    const dimensions = this.settings.dimensions;

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

    measure.xAxis = addXAxis(
        layout.svg,
        measure.scales.x,
        dimensions,
        this.settings.xType,
        this.set,
        measure.visits
    );

    measure.yAxis = addYAxis(
        layout.svg,
        measure.scales.y,
        dimensions
    );
}
