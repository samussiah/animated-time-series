import plot from './init/plot';
import iterate from './init/iterate';

export default function init() {
    plot.call(this, this.measure);

    // initialize time interval
    this.interval = d3.interval(() => {
        iterate.call(this, this.measure);
    }, this.settings.speed);
}
