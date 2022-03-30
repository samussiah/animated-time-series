export default function plotPoints(svg, data, scales) {
    const points = svg
        .selectAll('g.point-group')
        .data(data, (d) => d[0])
        .join('g')
        .classed('point-group', true)
        .attr('fill', (d) => scales.color(d[0]));

    points
        .selectAll('circle.point')
        .data(
            (d) => {
                return d[1].slice(0, this.settings.timepoint + 1);
            },
            (d,i) => [d.stratum[0], i].join('|')
        )
        .join('circle')
        .classed('point', true)
        .attr('cx', (d) => scales.x(d[0]))
        .attr('cy', (d) => scales.y(d[1]))
        .attr('r', 5)
        .attr('stroke', 'white');

    return points;
}
