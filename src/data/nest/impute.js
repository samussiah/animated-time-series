export default function impute(nested, set, settings) {
    let imputed = structuredClone(nested);

    // Iterate over measures to generate tabular summary.
    imputed.forEach((measure, i) => {
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

            try {
                stratumDatum.color_value = stratumDatum[1][0][1].data[0].color;
            } catch {
                console.warn('Missing [ color ] identified:');
                console.log(measure);
                console.log(stratum);
                console.log(stratumDatum[1][0][1]);
            }

            stratumDatum.offset = set.offsets[i];

            // Iterate over visits within strata.
            set.visit.forEach((visit, j) => {
                // Return data for given measure / stratum / visit.
                let visitDatum = stratumDatum[1].find((d) => d[0] === visit);

                // Handle missing data. If measure is not captured at given visit, use previous visit.
                if (visitDatum === undefined) {
                    console.log(measure[0], stratum, visit);
                    console.log(stratumDatum[1][j][0]);
                    visitDatum = j > 0
                        ? [...stratumDatum[1][j - 1]]
                        : [...stratumDatum[1][j]];
                    console.log(visitDatum);
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

    return imputed;
}
