export default function plotLines(svg, data, scales) {
    const lineGenerator = d3
        .line()
        .x((d) => scales.x(d[0]))
        .y((d) => scales.y(d[1].value));

    const lines = svg
        .selectAll('path.line')
        .data(data)
        .join('path')
        .classed('path', true)
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
        .style('stroke-width', 4)
        //.style('stroke-opacity', .5)
        .style('fill', 'none');

    lines.lineGenerator = lineGenerator;

    return lines;
}
