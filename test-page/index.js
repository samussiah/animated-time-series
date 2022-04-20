const dataset = 'adlb-trend';
const dsLogic = ['adlb', 'advs'].includes(dataset);

fetch(`./data/${dataset}.csv`)
    .then(response => response.text())
    .then(text => d3.csvParse(text))
    .then(data => {
        data.forEach(d => {
            d.pct_baseline = d.AVAL/d.BASE*100;
        });

        const subset = data
            .filter(d => (
                (dsLogic && d.AVISIT !== '.' && /Basophils/.test(d.PARAM)) || // subset on analysis records
                (dataset === 'adlb-trend' && !(+d.AVISITN % 1) && /count|ium/.test(d.PARAM)) // remove unscheduled visits
            ));

        const measureOrder = [
            ...new Set(subset.map(d => d.PARAM)).values()
        ].filter(measure => /count/.test(measure)).sort(d3.descending);

        const main = animatedTimeSeries(
            subset,
            '#container',
            {
                stratification_var: dsLogic ? 'TRTP' : 'ARMCD',
                xType: 'discrete',
                displayLegend: true,
                speed: 500,
                pause: 500,
                measureOrder,
                measureYTicks: [
                    {
                        key: 'WBC count (x 109 cells/L)',
                        value: [50, 150, 250, 350, 450, 550]
                    }
                ],
                result_var: 'pct_baseline',
                varLabels: {
                    result: '% of Baseline'
                },
                aggregateLabels: {
                    mean: 'Mean',
                    geomean: 'Geo. Mean',
                },
                aggregate: 'geomean',
            }
        );
    });
