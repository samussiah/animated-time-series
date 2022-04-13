export default function plotLines(svg, data, scales) {
    const lineGenerator = d3
        .line()
        .x((d) => {
            return scales.x(d[this.settings.xVar]) + d.stratum.offset;
        })
        .y((d) => {
            return scales.y(d[1].value);
        });

    const lines = svg.selectAll('path.line').data(data).join('path').classed('line', true);

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
        .attr('stroke-width', this.settings.strokeWidth)
        .attr('stroke-opacity', 0.75)
        .attr('fill', 'none');

    lines.lineGenerator = lineGenerator;

    return lines;
}
