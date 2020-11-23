export default function updateLines(measure) {
    const main = this;

    measure.lines.each(function (data) {
        const d2 = data[1].find((di) => di.visit === main.timepoint.visit);
        const index = data[1].findIndex((di) => di.visit === main.timepoint.visit);
        const previousVisits = data[1].slice(0, index);
        const d1 = previousVisits.pop();

        const line = d3.select(this);
        if (d1 && d2)
            line.attr(
                'x1',
                measure.xScale(d1[main.settings.x_var]) +
                    (main.settings.x_type === 'ordinal' ? measure.xScale.bandwidth() / 2 : 0)
            )
                .attr('y1', measure.yScale(d1[main.settings.y_var]))
                .attr(
                    'x2',
                    measure.xScale(d1[main.settings.x_var]) +
                        (main.settings.x_type === 'ordinal' ? measure.xScale.bandwidth() / 2 : 0)
                )
                .attr('y2', measure.yScale(d1[main.settings.y_var]))
                .attr(
                    'stroke',
                    main.settings.color_var === 'percent_change'
                        ? measure.colorScale(
                              ((d2[main.settings.y_var] - d1[main.settings.y_var]) /
                                  d1[main.settings.y_var]) *
                                  100
                          )
                        : measure.colorScale(d2[main.settings.y_var] - d1[main.settings.y_var])
                )
                .attr('stroke-opacity', 0.25)
                .transition()
                .ease(d3.easeQuad)
                .duration((2 * main.settings.speed) / 5)
                .attr(
                    'x2',
                    measure.xScale(d2[main.settings.x_var]) +
                        (main.settings.x_type === 'ordinal' ? measure.xScale.bandwidth() / 2 : 0)
                )
                .attr('y2', measure.yScale(d2[main.settings.y_var]));
        else
            line.transition()
                .duration((2 * main.settings.speed) / 5)
                .attr('stroke-opacity', 0);
    });
}
