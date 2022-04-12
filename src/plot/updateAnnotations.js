import updateSpacing from './annotations/updateSpacing';

export default function updateAnnotations(annotations, scales) {
    annotations.datum((d) => {
        const datum = d.stratum[1][this.settings.timepoint];

        return {
            x: scales.x(datum[this.settings.xVar]),
            y: scales.y(datum[1].value),
            color: scales.color(d[0]),
            text: d[0],
            stratum: d.stratum,
        };
    });

    updateSpacing.call(this, annotations.data());

    annotations
        .transition()
        .duration(this.settings.speed - 0.25 * this.settings.speed * this.settings.displayCIs)
        .attr('x', (d) => {
            return d.x;
        })
        .attr('y', (d) => {
            return d.y;
        });
}
