export default function x(domain, range, type) {
    let xScale;
    if (type === 'ordinal') {
        xScale = d3.scalePoint().domain(domain).range(range).padding([0.5]);
    } else {
        const extent = d3.extent(domain);
        const extentDiff = extent[1] - extent[0];
        xScale = d3
            .scaleLinear()
            .domain([extent[0] - extentDiff * 0.05, extent[1] + extentDiff * 0.05]) //.nice()
            .range(range);
    }

    return xScale;
}
