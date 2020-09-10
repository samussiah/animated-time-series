export default function updatePoints(measure) {
    const main = this;

    measure.points.each(function (data) {
        const d = data[1].find((di) => di.visit === main.visit);
        const baseline = data[1].find((d) => !!d.result);

        const point = d3.select(this);

        // Hide points that are missing
        if (main.visit === 0 && !d) point.style('display', 'none');
        else if (point.style('display') === 'none' && !!d)
            point.attr('cx', measure.xScale(d.day)).attr('cy', measure.yScale(d.result));

        const transition = point
            .transition()
            .ease(d3.easeQuad)
            .duration((2 * main.settings.speed) / 5)
            .delay((1 * main.settings.speed) / 5);

        if (d)
            transition
                .attr('cx', measure.xScale(d.day))
                .attr('cy', measure.yScale(d.result))
                .attr('fill', measure.colorScale(d.change))
                .attr('fill-opacity', 0.25)
                .attr('stroke', measure.colorScale(d.change))
                .style('display', null);
        else transition.attr('fill-opacity', 0.25).attr('stroke-opacity', 0.5);
    });
}
