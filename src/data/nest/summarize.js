export default function summarize(group, settings) {
    const results = group.map((d) => d.result).sort((a, b) => a - b);

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
