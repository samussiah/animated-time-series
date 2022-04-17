export default function mutate(data, settings) {
    const nRows = data.length;

    const cleansed = data
        .map((d) => {
            const datum = { ...d };

            // Rename data variables.
            Object.keys(settings)
                .filter((setting) => /_var$/.test(setting))
                .forEach((setting) => {
                    datum[setting.replace(/_var$/, '')] = [
                        'visit_order_var',
                        'day_var',
                        'result_var',
                        'baseline_var',
                        'change_var',
                        'percent_change_var',
                    ].includes(setting)
                        ? parseFloat(d[settings[setting]])
                        : datum[settings[setting]];
                });

            return datum;
        })
        .filter((d) => !isNaN(d.result));

    const nRowsCleansed = cleansed.length;
    const nRowsRemoved = nRows - nRowsCleansed;

    if (nRowsRemoved > 0) console.warn(`${nRowsRemoved} rows without results removed.`);

    return cleansed;
}
