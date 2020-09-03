fetch('./.csv')
    .then(response => response.text())
    .then(text => d3.csvParse(text))
    .then(data => {
        const main = animatedTimeSeries(
            data,
            '#container',
            {
            }
        );
    });
