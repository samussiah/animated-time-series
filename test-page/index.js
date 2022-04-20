const dataset = 'adlb-trend';

fetch(`./data/${dataset}.csv`)
    .then(response => response.text())
    .then(text => d3.csvParse(text))
    .then(data => {
        data.forEach(d => {
            d.pct_baseline = d.AVAL/d.BASE*100;
        });

        const subset = data
            .filter(d => (
                !(+d.AVISITN % 1) // remove unscheduled visits
            ));

        const main = animatedTimeSeries(
            subset,
            '#container',
            {
                stratification_var: 'ARMCD',
                xType: 'discrete',
                displayLegend: true
            }
        );
    });
