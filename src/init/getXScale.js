export default function getXScale(data) {
    return d3
        .scaleLinear()
        .domain(d3.extent(data, (d) => d.day))
        .rangeRound([
            this.settings.margin.left,
            this.settings.widthTimeSeries - this.settings.margin.right,
        ]);
}
