export default function updateFilters() {
    if (this.settings.filters) {
        const main = this;

        this.controls.filters.input.each(function (d) {
            d.value = main.set[d.var];
            main.util
                .addElement('filter__option', d3.select(this), 'option', main.set[d.var])
                .property('selected', true)
                .text((d) => d);
        });
    }
}
