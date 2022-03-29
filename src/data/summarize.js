export default function summarize(data, set) {
    const nested = d3.rollups(
        data,
        (group) => d3.sum(group, (d) => d.result),
        (d) => d.measure,
        (d) => d.stratification,
        (d) => d.visit
    );

    nested.forEach((measure, i) => {
        const tabular = Array(
            set.measure.length * set.stratification.length * set.visit.length
        );

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

        measure.tabular = tabular;
        console.log(measure.tabular);
    });

    return nested;
}
