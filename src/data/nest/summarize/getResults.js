export default function getResults(group, settings, minResults) {
    const measure = group[0].measure;
    const stratum = group[0].stratification;
    const minResult = minResults.get(measure);
    let results = group.map((d) => d.result).sort((a, b) => a - b);

    // Set non-positive results to minimum positive result when aggregating with geometric mean.
    if (['geomean'].includes(settings.aggregate)) {
        let nValid = 0;
        results = results.map((result) => {
            if (result <= 0) {
                result = minResult;
                nValid++;
            }

            return result;
        });

        if (nValid > 0)
            console.warn(
                `${nValid} non-positive ${measure} results for ${stratum} set to ${minResult}, the smallest positive result.`
            );
    }

    const nonInfinity = results.filter((result) => result !== Infinity);
    if (nonInfinity.length < results.length)
        console.warn(
            `${
                results.length - nonInfinity.length
            } infinite ${measure} results for ${stratum} removed.`
        );

    return nonInfinity;
}
