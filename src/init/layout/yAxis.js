export default function yAxis(canvas, yScale, dimensions) {
    const yAxis = canvas
        .append('g')
        .classed('atm-axis', true)
        .call(d3.axisLeft(yScale));

    yAxis.grid = canvas.append('g').call((g) =>
        g
            .attr('class', 'grid-lines')
            .selectAll('line')
            .data(yScale.ticks())
            .join('line')
            .attr('x1', 0)
            .attr('x2', dimensions.widthAdj)
            .attr('y1', (d) => yScale(d))
            .attr('y2', (d) => yScale(d))
    );

    return yAxis;
}
