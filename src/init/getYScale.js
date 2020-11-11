export default function getYScale(data) {
    const limits = this.settings.y_limits === null ? [0, 100] : this.settings.y_limits;
    const array = data.map((d) => d[this.settings.y_var]).sort((a, b) => a - b);
    const domain = limits.map((limit) => d3.quantile(array, limit / 100));

    return (
        d3
            .scaleLinear()
            .domain(domain)
            //.nice()
            .rangeRound([
                this.settings.height - this.settings.margin.bottom,
                this.settings.margin.top,
            ])
    );
}
