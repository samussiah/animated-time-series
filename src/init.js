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
        color: scales.color(
            this.data.set.color,
            this.settings.colorScheme
        )
    };

    // TODO: handle y-scale in getMeasure()
    this.measure = getMeasure(
        this.settings.measureIndex,
        this.data.nested,
        this.scales,
        this.settings.dimensions
    );
    throw '';

    layout.call(this, this.measure);
    plot.call(this, this.measure);

    // TODO: plot.on('end', () => update)
    // initialize time interval
    this.interval = d3.interval(() => {
        update.call(this, this.measure);
    }, this.settings.speed);
}
