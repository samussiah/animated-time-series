import updateSpacing from './annotations/updateSpacing';

export default function plotAnnotations(svg, data, scales) {
    // create elements
    const annotations = svg
        .selectAll('text.annotation')
        .data(data)
        .join('text')
        .classed('annotation', true);

    // bind data
    annotations
        .datum((d) => {
            const datum = d[1][this.settings.timepoint];

            return {
                x: scales.x(datum[0]),
                y: scales.y(datum[1].value),
                color: scales.color(d[0]),
                text: d[0],
                stratum: d
            };
        });

    updateSpacing.call(this, annotations.data());

    // apply attributes
    annotations
        .attr(
            'x',
            (d) => {
                return d.x;
            }
        )
        .attr(
            'y',
            (d) => {
                return d.y;
            }
        )
        .attr('dx', 7)
        .attr('dy', this.settings.fontSize/3)
        .attr('fill', (d) => {
            return d.color;
        })
        .style('font-size', this.settings.fontSize)
        .style('font-weight', this.settings.fontWeight)
        .text((d) => d.text);

    return annotations;
}
