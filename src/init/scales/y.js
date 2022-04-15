export default function y(data, range) {
    console.log(data);
    const values = data.tabular.map((d) => d.value);

    if (this.settings.displayCIs) {
        data.map((d) => d[1])
            .flat()
            .map((d) => d[1].stats[`${this.settings.aggregate}_ci`])
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
