export default function canvas(key, dimensions) {
    const main = this.layout.charts.append('div').classed('atm-container atm-div', true);

    const header = this.util.addElement('header', main, 'h3').text(key).style('display', 'none');

    const svg = this.util
        .addElement('time-series__svg', main, 'svg')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height)
        .style('display', 'none');

    const canvas = this.util
        .addElement('time-series__g', svg, 'g')
        .attr(
            'transform',
            'translate(' + dimensions.margin.left + ',' + dimensions.margin.top + ')'
        )
        .style('display', 'none');

    const transitionEnd = () => {
        header.style('display', null);
        svg.style('display', null);
        canvas.style('display', null);
        main.style('opacity', 0).transition().duration(this.settings.speed).style('opacity', 1);
    };

    const mainTransition = main
        .style('width', '0%')
        .transition()
        .duration(this.settings.speed)
        .style('width', '50%');

    return {
        canvas,
        mainTransition,
        transitionEnd,
    };
}
