export default function plotAnnotations(svg, data, scales) {
    const annotations = svg
        .selectAll('text.annotation')
        .data(data)
        .join('text')
        .classed('annotation', true)
        .datum((d) => {
            const subset = d[1].slice(0, this.settings.timepoint + 1);
            return { name: d[0], value: subset[subset.length - 1] };
        })
        .attr(
            'transform',
            (d) => 'translate(' + scales.x(d.value[0]) + ',' + scales.y(d.value[1]) + ')'
        )
        .attr('x', 12)
        .text((d) => d.name)
        .style('fill', (d) => scales.color(d.name))
        .style('font-size', 15);

    return annotations;
}
