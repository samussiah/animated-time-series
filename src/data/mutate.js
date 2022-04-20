export default function mutate(data, settings) {
    const nRows = data.length;

    const cleansed = data
        .map((d) => {
            const datum = {};

            // Rename data variables.
            Object.keys(settings)
                .filter((setting) => /_var$/.test(setting))
                .forEach((setting) => {
                    datum[setting.replace(/_var$/, '')] = [
                        'visit_order_var',
                        'day_var',
                        'result_var',
                        //'baseline_var',
                        //'change_var',
                        //'percent_change_var',
                    ].includes(setting)
                        ? parseFloat(d[settings[setting]])
                        : d[settings[setting]];
                });

            return datum;
        })
        .filter((d) => !isNaN(d.result))
        .sort((a, b) => {
            const measureSort = a.measure < b.measure ? -1 : b.measure < a.measure ? 1 : 0;
            const visitSort = a.visit_order - b.visit_order;
            const stratumSort =
                a.stratification < b.stratification
                    ? -1
                    : b.stratification < a.stratification
                    ? 1
                    : 0;
            const idSort = a.id < b.id ? -1 : b.id < a.id ? 1 : 0;

            return measureSort | visitSort | stratumSort | idSort;
        });

    const nRowsCleansed = cleansed.length;
    const nRowsRemoved = nRows - nRowsCleansed;

    if (nRowsRemoved > 0) console.warn(`${nRowsRemoved} rows without results removed.`);

    return cleansed;
}
