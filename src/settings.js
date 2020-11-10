const settings = {
    id_var: 'USUBJID',
    visit_var: 'AVISIT',
    visit_order_var: 'AVISITN',
    day_var: 'ADY',
    measure_var: 'PARAM',
    result_var: 'AVAL',
    baseline_var: 'BASE',
    change_var: 'CHG',
    percent_change_var: 'PCHG',
    aggregate: 'mean',
    speed: 2500,
    loop_time: 5000,
    paused: false,
    x_var: 'day', // ['visit', 'day']
    x_type: 'linear', // ['ordinal', 'linear', 'log']
    y_var: 'result', // ['result', 'change', 'percent_change']
    y_type: 'linear', // ['linear', 'log']
    color_var: 'change', // ['result', 'change', 'percent_change']
    color_type: 'linear', // ['categorical', 'linear', 'log']
};

export default settings;
