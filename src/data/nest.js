import summarize from './nest/summarize';
import impute from './nest/impute';

export default function nest(data, set, settings) {
    const minResults = d3.rollup(
        data,
        group => d3.min(group.map(d => d.result).filter(result => result > 0)),
        d => d.measure
    );

    // Nest data by measure, stratification, and visit and average results.
    const nested = d3.rollups(
        data,
        (group) => summarize(group, settings, minResults), // calculate statistics
        (d) => d.measure, // nest by outcome (panel)
        (d) => d.stratification, // nest by stratum (stratification)
        (d) => d.visit // nest by timepoint (x-axis value)
    );

    // Identify and generate missing combinations of outcome / stratum / timepoint.
    const imputed = impute(nested, set, settings);

    return imputed;
}
