export default function getSvg(container, dimensions) {
    // append the svg object to the body of the page
    const svg = container
        .append('svg')
        .attr('width', dimensions.width + dimensions.margin.left + dimensions.margin.right)
        .attr('height', dimensions.height + dimensions.margin.top + dimensions.margin.bottom);

    const g = svg
        .append('g')
        .attr(
            'transform',
            'translate(' + dimensions.margin.left + ',' + dimensions.margin.top + ')'
        );

    return g;
}
