export default function updateFilters() {
    if (this.settings.filters) {
        const main = this;

        this.controls.filters.input.each(function(d) {
            main.util
                .addElement('filter__option', d3.select(this), 'option', ['All', ...main.set[d.var]])
                .text(d => d);
        });
    }
}
