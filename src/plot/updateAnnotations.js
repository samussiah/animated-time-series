export default function updateAnnotations(annotations, scales) {
    annotations
        .datum((d) => {
            const subset = d.value.stratum[1].slice(0, this.settings.timepoint + 1);
            return { name: d.value.stratum[0], value: subset[subset.length - 1] };
        })
        .transition()
        .duration(this.settings.speed)
        .attr(
            'transform',
            (d) => 'translate(' + scales.x(d.value[0]) + ',' + scales.y(d.value[1].value) + ')'
        );
}
