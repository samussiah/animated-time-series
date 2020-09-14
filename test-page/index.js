fetch('./adlb-trend.csv')
    .then(response => response.text())
    .then(text => d3.csvParse(text))
    .then(data => {
        const main = animatedTimeSeries(
            data.filter(d => !(d.AVISITN%1) && /count/.test(d.PARAM)),
            '#container',
            {
                speed: 1000,
                loop_time: 1000,
            }
        );
    });
