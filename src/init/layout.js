import addCanvas from './layout/canvas';
import addXAxis from './layout/xAxis';
import addYAxis from './layout/yAxis';
import addLegend from './layout/legend';

// TODO: finish refactoring
export default function layout(measure) {
    const dimensions = this.settings.dimensions;

    const canvas = addCanvas.call(this, measure.data[0], dimensions);

    const xAxis = addXAxis(
        canvas,
        measure.scales.x,
        dimensions,
        this.settings.xType,
        this.data.set,
        measure.visits
    );

    const yAxis = addYAxis(
        canvas,
        measure.scales.y,
        dimensions
    );

    return {
        canvas,
        xAxis,
        yAxis
    };
}
