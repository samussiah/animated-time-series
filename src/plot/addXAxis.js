export default function addXAxis(type, svg, set, xScale, visits = null) {
    const xAxis = svg
        .append('g')
        .classed('atm-axis', true)
        .attr('transform', 'translate(0,' + svg.dimensions.height + ')');

    if (type === 'ordinal') {
        xAxis.call(d3.axisBottom(xScale));
    } else {
        xAxis.call(
            d3
                .axisBottom(xScale)
                .tickValues(set.timepoint)
                .tickFormat((d, i) => set.visit[i])
        );
    }

    xAxis
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('transform', 'rotate(-45)')
        .attr('dx', '-.8em')
        .attr('dy', '.15em');

    // TODO: make this work with a discrete time scale
    //if (visits !== null)
    //    xAxis
    //        .selectAll('.tick')
    //        .classed(
    //            'atm-missing',
    //            (d) => {
    //                visits.includes(d) === false
    //            });

    return xAxis;
}