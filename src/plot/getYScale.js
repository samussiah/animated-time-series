export default function getYScale(domain, dimensions, svg) {
    const yScale = d3.scaleLinear().domain(domain).nice().range([dimensions.height, 0]);

    svg.append('g').classed('atm-axis', true).call(d3.axisLeft(yScale));

    const yGrid = (g) =>
        g
            .attr('class', 'grid-lines')
            .selectAll('line')
            .data(yScale.ticks())
            .join('line')
            .attr('x1', 0) //dimensions.margin.left)
            .attr('x2', dimensions.width) // - dimensions.margin.right)
            .attr('y1', (d) => yScale(d))
            .attr('y2', (d) => yScale(d));

    svg.append('g').call(yGrid);

    return yScale;
}
