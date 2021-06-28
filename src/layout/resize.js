import getDimensions from './getDimensions';
import draw from '../init/draw';

export default function resize() {
    getDimensions.call(this);
    this.group.measure.forEach((measure) => {
        measure.layout.svg.attr('width', this.settings.width).attr('height', this.settings.height);
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
