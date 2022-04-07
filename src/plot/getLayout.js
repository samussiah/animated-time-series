export default function getLayout(key, dimensions) {
    const main = this.util.addElement('container', this.layout.charts);
    const header = this.util.addElement('header', main, 'h3').text(key);
    const width = dimensions.width + dimensions.margin.left + dimensions.margin.right;
    const height = dimensions.height + dimensions.margin.top + dimensions.margin.bottom;
    const margin = dimensions.margin;
    const svg = this.util
        .addElement('time-series__svg', main, 'svg')
        .attr('width', width)
        .attr('height', height);
    const g = svg
        .append('g')
        .attr(
            'transform',
            'translate(' + margin.left + ',' + margin.top + ')'
        );
    g.dimensions = dimensions;
    g.width = width;
    g.height = height;
    g.margin = margin;

    return {
        main,
        header,
        svg: g
    };
}
