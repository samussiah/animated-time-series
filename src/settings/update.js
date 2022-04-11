export default function update(settings) {
    // TODO: support non-stratified outputs.
    // Set stratification variable to whatever.
    //if (settings.stratification_var === null)
    //    settings.stratificaton_var = '?';//settings.stratification_var;

    // Set color variable to stratification variable if null.
    if (settings.color_var === null) settings.color_var = settings.stratification_var;

    //
    if (settings.var_labels.stratification === null)
        settings.var_labels.stratification = settings.stratification_var;

    if (!['ordinal', 'discrete'].includes(settings.xType)) settings.xType = 'ordinal';

    if (settings.xType === 'ordinal') settings.xVar = 'visit';
    else if (settings.xType === 'discrete') settings.xVar = 'timepoint';

    // Update footnotes.
    settings.footnotes = settings.footnotes.map((text) =>
        text.replace('[aggregate]', settings.aggregate).replace('[outcome]', settings.outcome)
    );

    return settings;
}
