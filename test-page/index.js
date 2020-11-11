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
                x_var: 'day',
                x_type: 'linear',
                y_var: 'result',
                y_type: 'linear',
                y_limits: [10,90],
                color_var: 'percent_change',
                color_type: 'linear',
            }
        );
    });
