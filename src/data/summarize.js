export default function summarize(data, set, settings) {
    // Nest data by measure, stratification, and visit and average results.
    const nested = d3.rollups(
        data,
        (group) => {
            return {
                data: group,
                value: d3[settings.aggregate](group, (d) => d.result)
            };
        },
        (d) => d.measure, // facet
        (d) => d.stratification, // color
        (d) => d.visit // x,y
    );

    // TODO: define a more complex nested value that includes the data, the summarized value, and
    // the color of the stratification variable, and anything else needed.

    // Iterate over measures to generate tabular summary.
    nested.forEach((measure, i) => {
        // Create array with as many elements as stratification and visit values combined.
        const tabular = Array(
            set.stratification.length * set.visit.length
        );

        // TODO: handle missing strata for given measure
        // Iterate over strata within measure.
        set.stratification.forEach((stratum,i) => {
            const stratumDatum = measure[1].find(d => d[0] === stratum);

            // Sort visit-level summary.
            if (stratumDatum)
                stratumDatum[1]
                    .sort((a, b) => (
                        set.visit.indexOf(a[0]) - set.visit.indexOf(b[0])
                    ));

            stratumDatum.color_value = stratumDatum[1][0][1].data[0][settings.color_var];

            // Iterate over visits within strata.
            set.visit.forEach((visit,j) => {
                // Return data for given measure / stratum / visit.
                let visitDatum = stratumDatum[1]
                    .find(d => d[0] === visit);

                // TODO: what if measure is not captured at first visit?  Use next visit?
                // If measure is not captured at given visit, use previous visit.
                if (visitDatum === undefined) {
                    visitDatum = [...stratumDatum[1][j-1]];
                    stratumDatum[1].splice(j, 0, visitDatum);
                }

                // Attach stratum-level data to visit.
                visitDatum.stratum = stratumDatum;

                // Define "row" in tabular summary.
                const datum = {
                    measure: measure[0],
                    stratum: stratumDatum[0],
                    visit: visitDatum[0],
                    value: visitDatum[0] === visit
                        ? visitDatum[1].value
                        : null
                };

                tabular[i * set.visit.length + j] = datum;
            });
        });

        measure.tabular = tabular.filter(d => true); // remove empty elements
        measure.visits = [
            ...new Set(measure.tabular.map(d => d.visit)).values()
        ];
    });

    return nested;
}
