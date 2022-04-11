import update from './settings/update';

export default function settings() {
    return {
        update,

        // variable mapping
        stratification_var: null,
        color_var: null,
        id_var: 'USUBJID',
        visit_var: 'AVISIT',
        visit_order_var: 'AVISITN',
        day_var: 'ADY',
        measure_var: 'PARAM',
        result_var: 'AVAL',

        var_labels: {
            stratification: null,
            color_var: null,
            id: 'Participant ID',
            visit: 'Visit',
            visit_order: 'Visit Order',
            day: 'Study Day',
            measure: 'Measure',
            result: 'Result',
        },

        // statistics
        aggregate: 'mean',

        // x stuff
        xType: 'ordinal', // [ 'ordinal' , 'discrete' ]
        xVar: 'visit', // [ 'visit', 'timepoint' ]

        // y stuff

        // color stuff
        displayLegend: false,
        annotate: true,
        fontSize: 15,
        fontWeight: 'bold',

        // animation
        play: true,
        timepoint: 0,
        speed: 1000,
        loopDelay: 10000,

        // dimensions
        width: null, // defined in ./layout/getDimensions
        height: null, // defined in ./layout/getDimensions
        margin: {},

        // miscellaneous
        footnotes: [
            //`<sup>1</sup> Displaying [aggregate] [outcome].`,
        ],
    };
}
