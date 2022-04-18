export default function update(settings) {
    // variable mapping
    if (settings.stratification_var === null)
        settings.stratificaton_var = settings.id_var;

    if (settings.color_var === null)
        settings.color_var = settings.stratification_var;

    // variable labels
    if (settings.varLabels.stratification === null)
        settings.varLabels.stratification = settings.stratification_var;

    // x
    if (!['ordinal', 'discrete'].includes(settings.xType))
        settings.xType = 'ordinal';

    if (settings.xType === 'ordinal')
        settings.xVar = 'visit';
    else if (settings.xType === 'discrete')
        settings.xVar = 'timepoint';

    // y
    if (settings.yLabel === null)
        settings.yLabel = `${
            settings.varLabels[settings.yVar]
        } - ${
            settings.aggregateLabels[settings.aggregate]
        }`;

    if (!['mean', 'geomean'].includes(settings.aggregate))
        settings.displayCIs = false;

    if (settings.alpha <= 0 | settings.alpha >= 1)
        settings.alpha = 0.05;

    if (settings.displayCIs === true)
        settings.yLabel = `${settings.yLabel} (${(1 - settings.alpha)*100}% CI)`

    // stratification and color
    if (settings.stratification_var !== settings.color_var) {
        settings.annotate = false;
        settings.displayLegend = true;
    }

    // Update footnotes.
    settings.footnotes = settings.footnotes.map((text) =>
        text.replace('[aggregate]', settings.aggregate).replace('[outcome]', settings.outcome)
    );

    return settings;
}
