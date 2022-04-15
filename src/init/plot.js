import plotLines from './plot/lines';
import plotPoints from './plot/points';
import plotCIs from './plot/CIs';
import plotAnnotations from './plot/annotations';

export default function plot(measure) {
    measure.timeout = d3.timeout(() => {
        // graphical objects
        measure.lines = plotLines.call(this, canvas, data, measure.scales);
        measure.points = plotPoints.call(this, canvas, data, measure.scales);
        if (this.settings.displayCIs)
            measure.CIs = plotCIs.call(this, canvas, data, measure.scales);
        if (this.settings.annotate)
            measure.annotations = plotAnnotations.call(this, canvas, data, measure.scales);
        else measure.legend = addLegend.call(this, canvas, measure.scales.color, dimensions);
    }, this.settings.speed*2);
}
