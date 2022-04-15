export default function color(domain, range) {
    const colorScale = d3.scaleOrdinal().domain(domain).range(range);

    return colorScale;
}
