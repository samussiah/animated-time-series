import getDimensions from './getDimensions';
import draw from '../init/draw';

export default function resize() {
    getDimensions.call(this);
    this.data.groups.measure.forEach(measure => {
        measure.containers.timeSeries.svg
            .attr('width', this.settings.widthTimeSeries)
            .attr('height', this.settings.height);
        measure.containers.pieChart.svg
            .attr('width', this.settings.widthPieChart)
            .attr('height', this.settings.height);
        measure.containers.pieChart.g
            .attr(
                'transform',
                `translate(${this.settings.widthPieChart / 2},${this.settings.height / 2})`
            );
        measure.xScale.rangeRound([
            this.settings.margin.left,
            this.settings.widthTimeSeries - this.settings.margin.right,
        ]);
        measure.yScale.rangeRound([
            this.settings.height - this.settings.margin.bottom,
            this.settings.margin.top,
        ]);
        draw.call(this, measure);
    });
}
