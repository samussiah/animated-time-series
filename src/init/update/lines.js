import d from '../draw/lines/d';

export default function updateLines(measure) {
    const main = this;

    measure.lines
        .transition()
        .duration((2 * this.settings.speed) / 5)
        .attr('d', (data) => measure.lineGenerator(d.call(this, data)));
}
