export default function getXScale(type, domain, dimensions) {
    let xScale;
    if (type === 'ordinal') {
        xScale = d3.scalePoint().domain(domain).range([0, dimensions.width]).padding([0.5]);
    } else {
        const extent = d3.extent(domain);
        const range = extent[1] - extent[0];
        xScale = d3
            .scaleLinear()
            .domain([extent[0] - range * 0.05, extent[1] + range * 0.05]) //.nice()
            .range([0, dimensions.width]);
    }

    return xScale;
}
