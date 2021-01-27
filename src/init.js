import timepoint from './init/timepoint';
import getXScale from './init/getXScale';
import getYScale from './init/getYScale';
import getColorScale from './init/getColorScale';
import layout from './init/layout';
import draw from './init/draw';
import interval from './init/interval';

export default function init() {
    // Capture the current timepoint (index, visit, median day).
    this.timepoint = timepoint.call(this);

    // All charts share common x-scale.
    this.xScale = getXScale.call(this, this.data);

    // Add one chart per measure.
    this.group.measure.forEach((measure, key) => {
        measure.data = measure;

        // chart scales
        measure.xScale = this.xScale;
        measure.yScale = getYScale.call(this, measure);
        measure.colorScale = getColorScale.call(this, measure);

        // chart layout
        measure.layout = layout.call(this, measure, key);

        // chart data: individuals
        measure.ids = d3.groups(
            measure.filter((d) => d.include),
            (d) => d.id
        );

        // chart data: population
        measure.aggregate = this.set.visit.reduce((aggregate, visit) => {
            aggregate.push([
                visit,
                d3[this.settings.aggregate](
                    measure.filter((d) => d.visit === visit),
                    (d) => d.result
                ), // aggregate result
                d3[this.settings.aggregate](
                    measure.filter((d) => d.visit === visit),
                    (d) => d.change
                ), // aggregate change
                d3[this.settings.aggregate](
                    measure.filter((d) => d.visit === visit),
                    (d) => d.percent_change
                ), // aggregate percent change
            ]);

            return aggregate;
        }, []);

        // Generate chart.
        draw.call(this, measure);
    });

    // Start animation.
    if (this.settings.play) this.interval = interval.call(this);
}
