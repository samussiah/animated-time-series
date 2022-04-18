export default function addLegend(container, colorScale) {
    const legendContainers = container
        .selectAll('div.atm-legend-item')
        .data(colorScale.domain())
        .join('div')
        .classed('atm-legend-item', true);
    
    const legendContent = legendContainers
        .append('p')
        .classed('atm-legend-item__content', true);

    legendContent
        .append('span')
        .classed('atm-legend-item__symbol', true)
        .style('background', (d,i) => colorScale(d)); 

    legendContent
        .insert('text')
        .classed('atm-legend-item__text', true)
        .text((d,i) => `${d} (n=${this.data.set.strata[d]})`);
}
