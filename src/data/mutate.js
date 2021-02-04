export default function mutate() {
    this.data.forEach((d) => {
        // Add a property to identify filtered records.
        d.include = true;

        // Rename data variables.
        Object.keys(this.settings)
            .filter((setting) => /_var$/.test(setting))
            .forEach((setting) => {
                d[setting.replace(/_var$/, '')] = [
                    'visit_order_var',
                    'day_var',
                    'result_var',
                    'baseline_var',
                    'change_var',
                    'percent_change_var',
                ].includes(setting)
                    ? parseFloat(d[this.settings[setting]])
                    : d[this.settings[setting]];
            });
    });
}
