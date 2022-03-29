// TODO: get faceting working
fetch('./adlb-trend.csv')
    .then(response => response.text())
    .then(text => d3.csvParse(text))
    .then(data => {
        const main = animatedTimeSeries(
            data.filter(d => (
                !(d.AVISITN%1)// && /mmol/.test(d.PARAM)
            )),
            '#container',
            {
                stratification_var: 'ARMCD',
            }
        );
    });
