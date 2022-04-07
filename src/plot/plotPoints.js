export default function plotPoints(svg, data, scales) {
    const pointGroups = svg
        .selectAll('g.point-group')
        .data(data, (d) => d[0])
        .join('g')
        .classed('point-group', true);

    pointGroups
        //.attr('fill-opacity', .75)
        .attr('fill', (d) => {
            return scales.color(d.color_value);
        });

    const points = pointGroups
        .selectAll('circle.point')
        .data(
            (d) => {
                return d[1].slice(0, this.settings.timepoint + 1);
            },
            (d, i) => {
                return [d.stratum[0], i].join('|');
            }
        )
        .join('circle')
        .classed('point', true);

    points
        .attr('cx', (d) => {
            return scales.x(d[0]);
        })
        .attr('cy', (d) => {
            return scales.y(d[1].value);
        })
        .attr('r', 5)
        .attr('stroke', 'white');

    return pointGroups;
}
