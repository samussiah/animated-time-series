export default function getXScale(domain, dimensions, svg, visits) {
    const xScale = d3.scalePoint().domain(domain).range([0, dimensions.width]).padding([0.5]);

    const xAxis = svg
        .append('g')
        .classed('atm-axis', true)
        .attr('transform', 'translate(0,' + dimensions.height + ')')
        .call(d3.axisBottom(xScale));

    xAxis.selectAll('.tick').classed('atm-missing', (d) => visits.includes(d) === false);

    return xScale;
}
