export default function drawLines(measure) {
    const lines = measure.layout.lines
        .selectAll('line')
        .data(measure.ids, (d) => d[0])
        .join('line')
        .attr('stroke-opacity', 0);

    return lines;
}
