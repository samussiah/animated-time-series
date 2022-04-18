import plotLines from './plot/lines';
import plotPoints from './plot/points';
import plotCIs from './plot/CIs';
import plotAnnotations from './plot/annotations';

export default function plot(measure) {
    const data = measure.data[1];
    console.log(data[0][1][0][1].data.map(d => d.result).sort((a,b) => a-b));

    measure.lines = plotLines.call(this, measure.layout.canvas, data, measure.scales);
    measure.points = plotPoints.call(this, measure.layout.canvas, data, measure.scales);

    if (this.settings.displayCIs)
        measure.CIs = plotCIs.call(this, measure.layout.canvas, data, measure.scales);

    if (this.settings.annotate)
        measure.annotations = plotAnnotations.call(
            this,
            measure.layout.canvas,
            data,
            measure.scales
        );
}
