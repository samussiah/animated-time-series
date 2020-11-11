export default function getColorScale(measure) {
    const maxChange =
        this.settings.color_var === 'change'
            ? d3.max(measure, (d) => Math.abs(d[this.settings.color_var]))
            : 100;
    return d3
        .scaleSequential()
        .domain([-maxChange, maxChange])
        .interpolator(d3.interpolateViridis)
        .clamp(true);
}
