export default function getColorScale(domain, range = d3.schemeSet2) {
    const colorScale = d3.scaleOrdinal().domain(domain).range(range);

    return colorScale;
}
