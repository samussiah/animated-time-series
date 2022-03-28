export default function getYScale(domain, dimensions, svg) {
    const yScale = d3.scaleLinear().domain(domain).range([dimensions.height, 0]);

    svg.append('g').call(d3.axisLeft(yScale));

    return yScale;
}
