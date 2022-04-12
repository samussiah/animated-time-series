// import nest from './summarize/nest';
// import shell from './summarize/shell';
// TODO: refactor - this shit's hard to pull apart
// TODO: define and display continuous x-axis
export default function summarize(data, set, settings) {
    // Nest data by measure, stratification, and visit and average results.
    const nested = d3.rollups(
        data,
        (group) => {
            const results = group
                .map(d => d.result)
                .sort((a,b) => a-b);

            const jObj = jStat(results);

            const n = group.length;
            const mean = d3.mean(results);
            const deviation = d3.deviation(results);
            const mean_ci = jStat.tci(
                mean,
                settings.alpha,
                results
            );

            const min = d3.min(results);
            const median = d3.median(results);
            const max = d3.max(results);

            const geomean = jStat.geomean(results);
            const geomean_ci = jStat.tci(
                Math.log(geomean),
                settings.alpha,
                results.map(result => Math.log(result))
            ).map(bound => Math.exp(bound));

            const stats = {
                n,
                mean,
                deviation,
                mean_ci,
                min,
                median,
                max,
                geomean,
                geomean_ci
            };

            return {
                data: group,
                stats,
                value: stats[settings.aggregate]
            };
        },
        (d) => d.measure, // facet
        (d) => d.stratification, // color
        (d) => d.visit // x,y
    );

    // Iterate over measures to generate tabular summary.
    nested.forEach((measure, i) => {
        // Create array with as many elements as stratification and visit values combined.
        const tabular = Array(set.stratification.length * set.visit.length);

        // TODO: handle missing strata for given measure
        // Iterate over strata within measure.
        set.stratification.forEach((stratum, i) => {
            let stratumDatum = measure[1].find((d) => d[0] === stratum);

            // Handle missing data.
            if (stratumDatum === undefined) {
                stratumDatum = [
                    stratum,
                    set.visit.map((visit) => {
                        return [
                            visit,
                            {
                                data: [],
                                value: null,
                            },
                        ];
                    }),
                ];

                measure[1].splice(i, 0, stratumDatum);
            }

            // Sort visit-level summary.
            if (stratumDatum)
                stratumDatum[1].sort((a, b) => set.visit.indexOf(a[0]) - set.visit.indexOf(b[0]));

            stratumDatum.color_value = stratumDatum[1][0][1].data[0][settings.color_var];

            // Iterate over visits within strata.
            set.visit.forEach((visit, j) => {
                // Return data for given measure / stratum / visit.
                let visitDatum = stratumDatum[1].find((d) => d[0] === visit);

                // TODO: what if measure is not captured at first visit?  Use next visit?
                // Handle missing data. If measure is not captured at given visit, use previous visit.
                if (visitDatum === undefined) {
                    visitDatum = [...stratumDatum[1][j - 1]];
                    stratumDatum[1].splice(j, 0, visitDatum);
                }

                visitDatum.visit = visitDatum[0];
                visitDatum.index = set.visit.findIndex((visit) => visit === visitDatum[0]);
                visitDatum.visit_order = set.visit_order[visitDatum.index];
                visitDatum.timepoint = set.timepoint[visitDatum.index];
                // TODO: add day?

                // Attach stratum-level data to visit.
                visitDatum.stratum = stratumDatum;

                // Define "row" in tabular summary.
                const datum = {
                    measure: measure[0],
                    stratum: stratumDatum[0],
                    visit: visitDatum[0],
                    value: visitDatum[0] === visit ? visitDatum[1].value : null,
                };

                tabular[i * set.visit.length + j] = datum;
            });
        });

        measure.tabular = tabular.filter((d) => true); // remove empty elements
        measure.visits = [...new Set(measure.tabular.map((d) => d.visit)).values()];
    });

    return nested;
}
