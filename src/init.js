import getXScale from './init/getXScale';
import getYScale from './init/getYScale';
import getColorScale from './init/getColorScale';
import layout from './init/layout';
import draw from './init/draw';
import update from './init/update';

export default function init() {
    this.visitIndex = 0;
    this.visit = this.data.visits[this.visitIndex];
    this.timepoint = this.data.timepoints[this.visitIndex];
    this.containers.timepoint.text(this.visit);

    this.xScale = getXScale.call(this, this.data);

    this.data.groups.measure.forEach((measure, key) => {
        measure.xScale = this.xScale;
        measure.yScale = getYScale.call(this, measure);
        measure.colorScale = getColorScale.call(this, measure.yScale);
        measure.containers = layout.call(this, measure, key);
        measure.ids = d3.group(measure, (d) => d.id);
        measure.aggregate = this.data.visits.reduce((aggregate, visit) => {
            aggregate.push([
                visit,
                d3[this.settings.aggregate](
                    measure.filter((d) => d.visit === visit),
                    (d) => d.result
                ),
            ]);

            return aggregate;
        }, []);
        draw.call(this, measure);
    });

    this.interval = d3.interval(() => {
        update.call(this);
    }, this.settings.speed);
}
