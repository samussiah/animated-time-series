export default function y(data, range, settings) {
    const values = data.tabular.map((d) => d.value);

    if (settings.displayCIs) {
        data[1]
            .map((d) => d[1])
            .flat()
            .map((d) => d[1].stats[`${settings.aggregate}_ci`])
            .flat()
            .forEach((ci) => values.push(ci));
    }

    const yScale = d3
        .scaleLinear()
        .domain([d3.min(values), d3.max(values)])
        .nice()
        .range(range);

    return yScale;
}
