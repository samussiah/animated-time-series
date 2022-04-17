import getTimepoint from './init/getTimepoint';
import getMeasure from './init/getMeasure';
import scales from './init/scales/index';
import layout from './init/layout';
import plot from './init/plot';
import update from './init/update';

export default function init() {
    this.timepoint = getTimepoint(this.settings.timepoint, this.data.set);

    // common scales (x, color)
    this.scales = {
        x: scales.x(
            this.data.set[this.settings.xVar],
            [0, this.settings.dimensions.widthAdj],
            this.settings.xType
        ),
        color: scales.color(this.data.set.color, this.settings.colorScheme),
    };

    this.measure = getMeasure(this.data.nested, this.scales, this.settings);

    this.measure.layout = layout.call(this, this.measure);
    this.measure.layout.mainTransition.on('end', () => {
        this.measure.layout.transitionEnd();
        plot.call(this, this.measure);

        d3.timeout(() => {
            // initialize time interval
            this.interval = d3.interval(() => {
                update.call(this, this.measure);
            }, this.settings.speed);
        }, this.settings.speed * 2);
    });
}
