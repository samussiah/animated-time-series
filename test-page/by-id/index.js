fetch('../adlb-trend.csv')
    .then(response => response.text())
    .then(text => d3.csvParse(text))
    .then(data => {
        const main = animatedTimeSeries(
            data.filter(d => (
                !(+d.AVISITN%1)
            )),
            '#container',
            {
                stratification_var: 'USUBJID',
                annotate: false,
                color_var: 'ARMCD'
            }
        );
    });
