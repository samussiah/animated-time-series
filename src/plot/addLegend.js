export default function addLegend(svg, colorScale) {
    const legend = svg
        .append('g')
        .classed('atm-legend', true);

    legend.selectAll("mydots")
        .data(colorScale.domain())
        .join('circle')
        .attr("cx", svg.width - svg.margin.left - svg.margin.right + 10)
        .attr("cy", function(d,i){ return i*20 - svg.margin.top / 2}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 4)
        .style("fill", function(d){ return colorScale(d)})

    legend.selectAll("mylabels")
        .data(colorScale.domain())
        .join("text")
        .attr("x", svg.width - svg.margin.left - svg.margin.right + 15)
        .attr("y", function(d,i){ return i*20 - svg.margin.top / 2}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ return colorScale(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style('font-size', this.settings.fontSize)
        .style('font-weight', this.settings.fontWeight)
        .style("alignment-baseline", "middle")

    return legend;
}
