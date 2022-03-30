export default function updatePoints(points, scales) {
    points
        .selectAll('circle.point')
        .data(
            (d) => {
                return d[1].slice(0, this.settings.timepoint + 1);
            },
            (d,i) => [d.stratum[0], i].join('|')
        )
        .join((enter) =>
            enter
                .append('circle')
                .classed('point', true)
                .attr('r', 5)
                .attr('stroke', 'white')
                .attr('cx', (d) => {
                    const datum = d.stratum[1][this.settings.timepoint - 1];
                    return scales.x(datum[0]);
                })
                .attr('cy', (d) => {
                    const datum = d.stratum[1][this.settings.timepoint - 1];
                    return scales.y(datum[1]);
                })
                .call((enter) =>
                    enter
                        .transition()
                        .duration(this.settings.speed)
                        .attr('cx', (d) => scales.x(d[0]))
                        .attr('cy', (d) => scales.y(d[1]))
                )
        );

    return points;
}
