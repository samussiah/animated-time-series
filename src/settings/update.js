export default function update() {
    // Check filters.
    this.settings.filters =
        Array.isArray(this.settings.filters) && this.settings.filters.length > 0
            ? this.settings.filters
                  .map((filter) => {
                      const obj = {};
                      obj.var = typeof filter === 'string' ? filter : filter.var;
                      obj.label = filter.label || filter.var;
                      obj.value = filter.value || 'All';

                      return obj;
                  })
                  .filter(
                      (filter) => filter.hasOwnProperty('var') && typeof filter.var === 'string'
                  )
            : [];

    // Update footnotes.
    this.settings.footnotes = this.settings.footnotes.map((text) =>
        text.replace('[color]', this.settings.color_var.replace('_', ' '))
    );

    if (this.settings.y_limits !== null)
        this.settings.footnotes.push(
            `<sup>*</sup> To mitigate the effect of outliers, the range of the y-axis encompasses the ${this.settings.y_limits
                .map((limit) => `${limit}th`)
                .join(' through ')} quantile of the results.`
        );
}
