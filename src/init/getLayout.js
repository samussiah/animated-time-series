export default function getLayout(key, dimensions) {
    const main = this.layout.charts
        .insert('div', ':first-child')
        .classed('atm-container atm-div', true);

    const header = this.util.addElement('header', main, 'h3').text(key);
    const svg = this.util.addElement('time-series__svg', main, 'svg')
        .attr('width', dimensions.width)
        .attr('height', dimensions.height);
    const g = this.util.addElement('time-series__g', svg, 'g')
        .attr('transform', 'translate(' + dimensions.margin.left + ',' + dimensions.margin.top + ')');

    return {
        main,
        header,
        canvas: svg,
        svg: g
    };
}
