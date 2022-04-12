export default function updateCIs(CIs, scales) {
    CIs
        .selectAll('line.ci')
        .data(
            (d) => {
                return d[1].slice(0, this.settings.timepoint + 1);
            },
            (d, i) => {
                return [d.stratum[0], i].join('|');
            }
        )
        .join((enter) =>
            enter
                .append('line')
                .classed('ci', true)
                .attr('x1', (d) => {
                    return scales.x(d[this.settings.xVar]);
                })
                .attr('x2', (d) => {
                    return scales.x(d[this.settings.xVar]);
                })
                .attr('y1', (d) => {
                    return scales.y(d[1].value);
                })
                .attr('y2', (d) => {
                    return scales.y(d[1].value);
                })
                .call((enter) =>
                    enter
                        .transition()
                        .duration(.25*this.settings.speed)
                        .delay(.75*this.settings.speed)
                        .attr('y1', (d) => {
                            return scales.y(d[1].stats[`${this.settings.aggregate}_ci`][0]);
                        })
                        .attr('y2', (d) => {
                            return scales.y(d[1].stats[`${this.settings.aggregate}_ci`][1]);
                        })
                )
        );

    return CIs;
}
