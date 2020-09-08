export default function getScaleOrdinal(data, variable) {
    return d3
        .scaleOrdinal()
        .domain([...new Set(data.map((d) => d[variable])).values()])
        .range(d3.schemeCategory10);
}
