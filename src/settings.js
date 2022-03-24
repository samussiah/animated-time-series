import update from './settings/update';

export default function settings() {
    return {
        update,

        // variable mapping
        stratification_var: null,
        id_var: 'USUBJID',
        visit_var: 'AVISIT',
        visit_order_var: 'AVISITN',
        day_var: 'ADY',
        measure_var: 'PARAM',
        result_var: 'AVAL',
        change_var: 'CHG',
        percent_change_var: 'PCHG',
        outcome: 'result',

        var_labels: {
            stratification: null,
            id: 'Participant ID',
            visit: 'Visit',
            visit_order: 'Visit Order',
            measure: 'Measure',
            result: 'Result',
            baseline: 'Baseline',
            change: 'Change',
            chg: 'Change',
            percent_change: '% Change',
            pchg: '% Change',
            fold_change: 'Fold Change',
            fchg: 'Fold Change',
        },

        // statistics
        aggregate: 'mean',

        // animation
        play: true,
        timepoint: 0,
        speed: 2500,
        loop_delay: 10000,

        // x
        x_var: 'day', // ['visit', 'day']
        x_type: 'linear', // ['ordinal', 'linear', 'log']

        // y
        y_var: 'result', // ['result', 'change', 'percent_change']
        y_type: 'linear', // ['linear', 'log']
        y_limits: null, // [25,75]

        // color
        color_var: 'change', // ['result', 'change', 'percent_change']
        color_type: 'linear', // ['categorical', 'linear', 'log']

        // dimensions
        width: null, // defined in ./layout/getDimensions
        height: null, // defined in ./layout/getDimensions
        margin: {},

        // miscellaneous
        footnotes: [
            `<sup>1</sup> The color of points represents [color] from baseline.`,
            `<sup>2</sup> The color of lines represents [color] from the previous timepoint.`,
        ],
    };
}
