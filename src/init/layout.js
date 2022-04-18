import addCanvas from './layout/canvas';
import addXAxis from './layout/xAxis';
import addYAxis from './layout/yAxis';
import addLegend from './layout/legend';

// TODO: finish refactoring
export default function layout(measure) {
    const dimensions = this.settings.dimensions;

    const { canvas, mainTransition, transitionEnd } = addCanvas.call(
        this,
        measure.data[0],
        dimensions
    );

    const xAxis = addXAxis.call(this,
        canvas,
        measure.scales.x,
        dimensions,
        this.settings.xType,
        this.data.set,
        measure.visits
    );

    const yAxis = addYAxis.call(this,
        canvas,
        measure.scales.y,
        dimensions
    );

    //let legend;
    //if (this.settings.displayLegend)
    //    legend = addLegend(
    //        canvas,
    //        measure.scales.color,
    //        dimensions,
    //        this.settings
    //    );

    return {
        canvas,
        mainTransition,
        transitionEnd,
        xAxis,
        yAxis,
        //legend
    };
}
