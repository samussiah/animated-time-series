export default function update(settings) {
    // Set stratification variable to whatever.
    //if (settings.stratification_var === null)
    //    settings.stratificaton_var = '?';//settings.stratification_var;

    // Set color variable to stratification variable if null.
    if (settings.color_var === null)
        settings.color_var = settings.stratification_var;

    // 
    if (settings.var_labels.stratification === null)
        settings.var_labels.stratification = settings.stratification_var;

    // Update footnotes.
    settings.footnotes = settings.footnotes.map((text) =>
        text.replace('[aggregate]', settings.aggregate)
            .replace('[outcome]', settings.outcome)
    );

    return settings;
}
