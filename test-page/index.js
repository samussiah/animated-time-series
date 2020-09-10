fetch('./adlb-trend.csv')
    .then(response => response.text())
    .then(text => d3.csvParse(text))
    .then(data => {
        console.log(new Set(data.map(d => d.PARAM)));
        const main = animatedTimeSeries(
            data.filter(d => !(d.AVISITN%1) && /count/.test(d.PARAM)),
            '#container',
            {
                speed: 1000,
            }
        );
    });
