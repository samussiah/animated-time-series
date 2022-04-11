export default function getXScale(domain, dimensions) {
    const xScale = d3.scalePoint()
        .domain(domain)
        .range([0, dimensions.width])
        .padding([0.5])
        //.tickValues(set.timepoint)
        //.tickFormat((d,i) => set.visit[i]);
    console.log(domain);
    // TODO: linear x-scale with tickValues? and tickFormat function

    return xScale;
}
