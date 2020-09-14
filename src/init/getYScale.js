export default function getYScale(data) {
    return d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d.result))
        //.nice()
        .rangeRound([
            this.settings.height - this.settings.margin.bottom,
            this.settings.margin.top,
        ]);
}
