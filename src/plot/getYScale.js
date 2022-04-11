export default function getYScale(values, dimensions) {
    const yScale = d3
        .scaleLinear()
        .domain([d3.min(values), d3.max(values)])
        .nice()
        .range([dimensions.height, 0]);

    return yScale;
}
