export default function pieText(measure) {
    measure.pieText
        .data(measure.pieData)
        .transition()
        .duration(this.settings.speed / 2)
        .attrTween('transform', function (d) {
            const i = d3.interpolate(this._current, d);
            this._current = i(0);
            return function (t) {
                return `translate(${measure.arcLabel.centroid(i(t))})`;
            };
        });
    measure.pieText.select('tspan:last-child').text((d) => d3.format('.1%')(d.data));
}
