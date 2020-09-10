export default function getColorScale(measure) {
    const maxChange = d3.max(measure, (d) => Math.abs(d.change));
    return d3.scaleSequential().domain([-maxChange, maxChange]).interpolator(d3.interpolateViridis);
}
