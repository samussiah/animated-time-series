export default function update() {
    if (this.settings.var_labels.stratification === null)
        this.settings.var_labels.stratification = this.settings.stratification_var;

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
