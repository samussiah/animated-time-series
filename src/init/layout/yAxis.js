export default function yAxis(canvas, yScale, dimensions) {
    const yAxis = canvas.append('g').classed('atm-axis', true).call(d3.axisLeft(yScale));

    yAxis.gridLines = canvas.append('g').call((g) => {
        g.attr('class', 'grid-lines')
            .selectAll('line')
            .data(yScale.ticks())
            .join('line')
            .attr('x1', 0)
            .attr('x2', dimensions.widthAdj)
            .attr('y1', (d) => yScale(d))
            .attr('y2', (d) => yScale(d));
    });

    yAxis.label = canvas.append('g').call((g) => {
        g.append('text')
            .attr('class', 'axis-label')
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .attr('font-size', 16)
            .attr('font-weight', 'bold')
            .attr('x', -dimensions.heightAdj / 2)
            .attr('y', -(dimensions.margin.left - 32))
            .text(this.settings.yLabel);
    });

    return yAxis;
}
