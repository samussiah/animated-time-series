export default function update() {
    if (this.settings.var_labels.stratification === null)
        this.settings.var_labels.stratification = this.settings.stratification_var;

    // Update footnotes.
    this.settings.footnotes = this.settings.footnotes.map((text) =>
        text.replace('[aggregate]', this.settings.aggregate)
            .replace('[outcome]', this.settings.outcome)
    );
}
