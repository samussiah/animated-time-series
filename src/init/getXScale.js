export default function getXScale(data) {
    let scale;

    switch (this.settings.x_type) {
        case 'linear':
            scale = d3.scaleLinear()
                .domain(d3.extent(data, (d) => d.day));
            break;
        case 'ordinal':
            scale = d3.scaleBand()
                .domain(data.visits);
            break;
        case 'log':
            d3.scaleLog()
                .domain(d3.extent(data, d => d.day));
            break;
        default:
            alert(`[ ${this.settings.x_type} ] is an invalid x-axis type.  Please choose one of [ 'linear', 'ordinal', 'log' ].`)
            break;
    }

    scale.rangeRound([
        this.settings.margin.left,
        this.settings.width - this.settings.margin.right,
    ]);

    return scale;
}
