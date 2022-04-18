export default function summarize(group, settings, minResults) {
    const measure = group[0].measure;
    const stratum = group[0].stratification;
    const minResult = minResults.get( measure );
    let results = group.map((d) => d.result).sort((a, b) => a - b);

    // Set non-positive results to minimum positive result when aggregating with geometric mean.
    if (['geomean'].includes(settings.aggregate)) {
        let nValid = 0;
        results = results.map(result => {
            if (result <= 0) {
                result = minResult;
                nValid++;
            }

            return result;
        });

        if (nValid > 0)
            console.warn(`${ nValid } non-positive ${ measure } results for ${ stratum } set to ${ minResult }, the smallest positive result.`)
    }

    const jObj = jStat(results);

    const n = group.length;
    const mean = d3.mean(results);
    const deviation = d3.deviation(results);
    const mean_ci = jStat.tci(mean, settings.alpha, results);

    const min = d3.min(results);
    const median = d3.median(results);
    const max = d3.max(results);

    const geomean = jStat.geomean(results);
    const geomean_ci = jStat
        .tci(
            Math.log(geomean),
            settings.alpha,
            results.map((result) => Math.log(result))
        )
        .map((bound) => Math.exp(bound));

    const stats = {
        n,
        mean,
        deviation,
        mean_ci,
        min,
        median,
        max,
        geomean,
        geomean_ci,
    };

    return {
        data: group,
        stats,
        value: stats[settings.aggregate],
    };
}
