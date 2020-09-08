export default function getScaleSequential(scale) {
    const lo = scale.domain()[0];
    const hi = scale.domain()[1];
    const range = hi - lo;
    return d3
        .scaleSequential()
        .domain([-Math.abs(hi - lo), Math.abs(hi - lo)])
        .interpolator(d3.interpolateViridis);
}
