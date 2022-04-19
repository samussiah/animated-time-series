// TODO: offset annotation irrespective of point offsets
fetch('./adlb-trend.csv')
    .then(response => response.text())
    .then(text => d3.csvParse(text))
    .then(data => {
        data.forEach(d => {
            d.pct_baseline = d.AVAL/d.BASE*100;
        });

        const main = animatedTimeSeries(
            data.filter(d => (
                !(+d.AVISITN%1) // remove "unscheduled" visits
            )),
            '#container',
            {
                stratification_var: 'ARMCD',
                result_var: 'pct_baseline',
                xType: 'discrete',
                displayLegend: true,
                colorScheme: ['red', 'black', 'blue'],
                varLabels: {
                    result: '% of Baseline'
                },
                aggregateLabels: {
                    mean: 'Mean',
                    geomean: 'Geo. Mean',
                },
                aggregate: 'geomean',
                speed: 500,
                pause: 500,
            }
        );
    });
