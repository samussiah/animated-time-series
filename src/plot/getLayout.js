export default function getLayout(key, dimensions) {
    const main = this.util.addElement('container', this.layout.charts);
    const header = this.util.addElement('header', main, 'h3').text(key);
    const svg = this.util
        .addElement('time-series__svg', main, 'svg')
        .attr('width', dimensions.width + dimensions.margin.left + dimensions.margin.right)
        .attr('height', dimensions.height + dimensions.margin.top + dimensions.margin.bottom);
    const g = svg
        .append('g')
        .attr(
            'transform',
            'translate(' + dimensions.margin.left + ',' + dimensions.margin.top + ')'
        );

    return {
        main,
        header,
        svg: g
    };
}
