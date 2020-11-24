export default function filters(controls) {
    const main = this;
    const container = this.util.addElement('filters', controls);
    const containers = this.util
        .addElement('filter', container, 'div', this.settings.filters);
    const labels = this.util.addElement('filter__label', containers, 'span')
        .text(d => d.label);
    const input = this.util.addElement('filter__dropdown', containers, 'select');

    input.on('change', function (event, d) {
        d.value = this.value;
        main.data.filtered = main.data;
        main.settings.filters.forEach(filter => {
            if (filter.value !== 'All')
                main.data.filtered = main.data.filtered
                    .filter(di => di[filter.var] === filter.value);
        });

        // TODO: update measure-level data
        //main.group.measure.forEach((measure, key) => {
        //    // chart scales
        //    measure.xScale = this.xScale;
        //    measure.yScale = getYScale.call(this, measure);
        //    measure.colorScale = getColorScale.call(this, measure);

        //    // chart layout
        //    measure.layout = layout.call(this, measure, key);

        //    // chart data: individuals
        //    measure.ids = d3.groups(measure, (d) => d.id);

        //    // chart data: population
        //    measure.aggregate = this.set.visit.reduce((aggregate, visit) => {
        //        aggregate.push([
        //            visit,
        //            d3[this.settings.aggregate](
        //                measure.filter((d) => d.visit === visit),
        //                (d) => d.result
        //            ), // aggregate result
        //            d3[this.settings.aggregate](
        //                measure.filter((d) => d.visit === visit),
        //                (d) => d.change
        //            ), // aggregate change
        //            d3[this.settings.aggregate](
        //                measure.filter((d) => d.visit === visit),
        //                (d) => d.percent_change
        //            ), // aggregate percent change
        //        ]);

        //        return aggregate;
        //    }, []);

        //    // Generate chart.
        //    draw.call(this, measure);
        //});
    });

    return {
        container,
        containers,
        labels,
        input,
    };
}
