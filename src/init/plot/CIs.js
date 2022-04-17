export default function plotCIs(svg, data, scales) {
    const ciGroups = svg
        .selectAll('g.ci-group')
        .data(data, (d) => d[0])
        .join('g')
        .classed('ci-group', true);

    ciGroups
        //.attr('fill-opacity', .75)
        .attr('stroke', (d) => {
            return scales.color(d.color_value);
        })
        .attr('stroke-width', this.settings.strokeWidth);

    const CIs = ciGroups
        .selectAll('line.ci')
        .data(
            (d) => {
                return d[1].slice(0, this.settings.timepoint + 1);
            },
            (d, i) => {
                return [d.stratum[0], i].join('|');
            }
        )
        .join('line')
        .classed('ci', true);

    CIs.attr('x1', (d) => {
        return scales.x(d[this.settings.xVar]) + d.stratum.offset;
    })
        .attr('x2', (d) => {
            return scales.x(d[this.settings.xVar]) + d.stratum.offset;
        })
        .attr('y1', (d) => {
            return scales.y(d[1].value);
        })
        .attr('y2', (d) => {
            return scales.y(d[1].value);
        })
        .attr('stroke-linecap', 'round')
        .transition()
        .duration(this.settings.speed / 4)
        .delay(this.settings.speed / 2)
        .attr('y1', (d) => {
            return scales.y(d[1].stats[`${this.settings.aggregate}_ci`][0]);
        })
        .attr('y2', (d) => {
            return scales.y(d[1].stats[`${this.settings.aggregate}_ci`][1]);
        });

    return ciGroups;
}
