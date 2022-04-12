fetch('./adlb-trend.csv')
    .then(response => response.text())
    .then(text => d3.csvParse(text))
    .then(data => {
        const main = animatedTimeSeries(
            data.filter(d => (
                !(+d.AVISITN%1) && // remove "unscheduled" visits
                /count/.test(d.PARAM)
            )),
            '#container',
            {
                stratification_var: 'ARMCD',
                xType: 'discrete'
            }
        );
    });
