export default function xAxis(canvas, xScale, dimensions, type, set, visits = null) {
    const xAxis = canvas
        .append('g')
        .classed('atm-axis', true)
        .attr('transform', 'translate(0,' + dimensions.heightAdj + ')');

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

    if (this.settings.rotateXTickLabels)
        xAxis
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('transform', 'rotate(-45)')
            .attr('dx', '-.8em')
            .attr('dy', '.15em');

    xAxis.label = canvas.append('g').call((g) => {
        g.append('text')
            .attr('class', 'axis-label')
            .attr('text-anchor', 'middle')
            .attr('font-size', 16)
            .attr('font-weight', 'bold')
            .attr('x', dimensions.widthAdj / 2)
            .attr('y', dimensions.heightAdj + dimensions.margin.bottom - 32)
            .text(this.settings.xLabel);
    });

    return xAxis;
}
