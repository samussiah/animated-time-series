export default function updatePoints(measure) {
    const main = this;

    measure.points.each(function (data) {
        const d = data[1].find((di) => di.visit === main.visit);

        // TODO: more robust baseline identification
        const baseline = data[1].find((d) => !!d.result);

        const point = d3.select(this);

        if (main.visit === 0 && !d) point.style('display', 'none');
        else if (point.style('display') === 'none' && !!d)
            point.attr('cx', measure.xScale(d.day)).attr('cy', measure.yScale(d.result));

        const transition = point
            .transition()
            .ease(d3.easeQuad)
            .duration((2 * main.settings.speed) / 5)
            .delay((1 * main.settings.speed) / 5)
            .attr('fill-opacity', 0.25)
            .attr('stroke-opacity', 0.5);

        if (d)
            transition
                .attr('cx', measure.xScale(d[main.settings.x_var]) + (main.settings.x_type === 'ordinal' ? measure.xScale.bandwidth()/2 : 0))
                .attr('cy', measure.yScale(d[main.settings.y_var]))
                .attr('fill', measure.colorScale(d[main.settings.color_var]))
                .attr('stroke', measure.colorScale(d[main.settings.color_var]));
    });
}
