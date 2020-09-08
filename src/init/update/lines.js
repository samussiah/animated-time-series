export default function updateLines(measure) {
    const main = this;

    measure.lines.each(function (data) {
        const d2 = data[1].find((di) => di.visit === main.visit);
        const index = data[1].findIndex((di) => di.visit === main.visit);
        const previousVisits = data[1].slice(0, index);
        const d1 = previousVisits.pop();

        const line = d3.select(this);
        if (d1 && d2)
            line.attr('x1', measure.xScale(d1.ADY))
                .attr('y1', measure.yScale(d1.AVAL))
                .attr('x2', measure.xScale(d1.ADY))
                .attr('y2', measure.yScale(d1.AVAL))
                .attr('stroke', measure.colorScale(d2.AVAL - d1.AVAL))
                .attr('stroke-opacity', 0.25)
                .transition()
                .ease(d3.easeQuad)
                .duration((2 * main.settings.speed) / 5)
                .attr('x2', measure.xScale(d2.ADY))
                .attr('y2', measure.yScale(d2.AVAL));
        else
            line.transition()
                .duration((2 * main.settings.speed) / 5)
                .attr('stroke-opacity', 0);
    });
}
