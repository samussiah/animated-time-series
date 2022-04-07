export default function plotLines(svg, data, scales) {
    const lineGenerator = d3
        .line()
        .x((d) => scales.x(d[0]))
        .y((d) => scales.y(d[1].value));

    const lines = svg
        .selectAll('path.line')
        .data(data)
        .join('path')
        .classed('line', true);

    lines
        .attr('d', (d) => {
            const currentTimepoint = d[1][this.settings.timepoint];
            const pathData = d[1].map((d, i) =>
                i >= this.settings.timepoint ? currentTimepoint : d
            );

            return lineGenerator(pathData);
        })
        .attr('stroke', function (d) {
            return scales.color(d.color_value);
        })
        .attr(
            'stroke-width',
            Math.max(
                12/this.set.stratification.length,
                1
            )
        )
        //.attr('stroke-opacity', .5)
        .attr('fill', 'none');

    lines.lineGenerator = lineGenerator;

    return lines;
}
