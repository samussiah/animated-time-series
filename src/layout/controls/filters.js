import SlimSelect from 'slim-select';
import createGroup from '../../data/group/create';
import draw from '../../init/draw';

export default function filters(parent) {
    const main = this;
    const container = this.util.addElement('filters', parent).classed('atm-controls-spacing', true);
    const header = this.util.addElement('filters__header', container, 'span').text('Filters');
    const containers = this.util.addElement('filter', container, 'div', this.settings.filters);
    const labels = this.util.addElement('filter__label', containers, 'span').text((d) => d.label);
    const input = this.util
        .addElement('filter__dropdown', containers, 'select')
        .property('multiple', true);
    input.each(function (d, i, selection) {
        d.select = new SlimSelect({
            select: this,
        });
    });

    input.on('change', function (event, d) {
        // Update filter object with current selection.
        d.value = d.select.selected();

        // Flag records in the data that should be excluded.
        main.data.forEach((d) => {
            d.include = main.settings.filters.every((filter) => {
                return filter.value.includes(d[filter.var]);
            });
        });

        // Update each chart.
        main.group.measure.forEach((measure, key) => {
            // chart data: individuals
            measure.ids = d3.groups(
                measure.filter((d) => d.include),
                (d) => d.id
            );

            // chart data: population
            measure.aggregate = main.set.visit.reduce((aggregate, visit) => {
                aggregate.push([
                    visit,
                    d3[main.settings.aggregate](
                        measure.filter((d) => d.visit === visit),
                        (d) => d.result
                    ), // aggregate result
                    d3[main.settings.aggregate](
                        measure.filter((d) => d.visit === visit),
                        (d) => d.change
                    ), // aggregate change
                    d3[main.settings.aggregate](
                        measure.filter((d) => d.visit === visit),
                        (d) => d.percent_change
                    ), // aggregate percent change
                ]);

                return aggregate;
            }, []);

            // Generate chart.
            draw.call(main, measure);
        });
    });

    return {
        container,
        containers,
        labels,
        input,
    };
}
