import getDimensions from './getDimensions';
import draw from '../init/draw';

export default function resize() {
    getDimensions.call(this);
    this.data.groups.measure.forEach((measure) => {
        measure.containers.timeSeries.svg
            .attr('width', this.settings.width)
            .attr('height', this.settings.height);
        measure.xScale.rangeRound([
            this.settings.margin.left,
            this.settings.width - this.settings.margin.right,
        ]);
        measure.yScale.rangeRound([
            this.settings.height - this.settings.margin.bottom,
            this.settings.margin.top,
        ]);
        draw.call(this, measure);
    });
}
