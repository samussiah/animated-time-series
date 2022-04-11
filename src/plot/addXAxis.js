export default function addXAxis(svg, xScale, visits = null) {
    const xAxis = svg
        .append('g')
        .classed('atm-axis', true)
        .attr('transform', 'translate(0,' + svg.dimensions.height + ')')
        .call(d3.axisBottom(xScale));

    if (visits !== null)
        xAxis
            .selectAll('.tick')
            .classed('atm-missing', (d) => visits.includes(d) === false);

    return xAxis;
}
