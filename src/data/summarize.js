export default function summarize(data, set) {
    // Nest data by measure, stratification, and visit and average results.
    const nested = d3.rollups(
        data,
        (group) => d3.mean(group, (d) => d.result),
        (d) => d.measure,
        (d) => d.stratification,
        (d) => d.visit
    );

    // Iterate over measures to generate tabular summary.
    nested.forEach((measure, i) => {
        // Create array with as many elements as stratification and visit values combined.
        const tabular = Array(
            set.stratification.length * set.visit.length
        );

        // Iterate over strata within measure.
        //set.stratification.forEach((stratum,i) => {
        //    const stratumDatum = measure[1].find(d => d[0] === stratum);
        //    if (stratumDatum)
        //        stratumDatum[1]
        //            .sort((a, b) => (
        //                set.visit.indexOf(a[0]) - set.visit.indexOf(b[0])
        //            ));

        //    // Iterate over visits within strata.
        //    set.visit.forEach((visit,j) => {
        //        // Return data for given measure / stratum / visit.
        //        const visitDatum = stratumDatum[1]
        //            .find(d => d[0] === visit);
        //        console.log(visitDatum);
        //        if (visitDatum)
        //            visitDatum.stratum = stratum;

        //        // Define "row" in tabular summary.
        //        const datum = {
        //            measure: measure[0],
        //            stratum: stratumDatum[0],
        //            visit: visit,
        //            // Set value to null if this combination of measure / stratum / visit does not exist.
        //            value: visitDatum ? visitDatum[1] : null // 
        //        };

        //        tabular[i * set.visit.length + j] = datum;
        //    });
        //});

        measure[1].forEach((stratum, i) => {
            stratum[1]
                .sort((a, b) => (
                    set.visit.indexOf(a[0]) - set.visit.indexOf(b[0])
                ));

            stratum[1].forEach((visit, j) => {
                visit.stratum = stratum;
                const datum = {
                    measure: measure[0],
                    stratum: stratum[0],
                    visit: visit[0],
                    value: visit[1],
                };
                tabular[i * set.visit.length + j] = datum;
            });
        });

        measure.tabular = tabular.filter(d => true); // remove empty elements
    });

    return nested;
}
