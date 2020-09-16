export default function pieChart(measure) {
    //measure.pieChart.data(measure.pieData, d => d.index);
    measure.pieChart
        .transition()
        .duration(this.settings.speed / 2)
        .ease(d3.easeQuad)
        .attrTween('d', function (d) {
            const i = d3.interpolate(this._current, d);
            this._current = i(0);
            return function (t) {
                return measure.arc(i(t));
            };
        });
}
