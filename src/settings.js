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
        displayCIs: true,
        alpha: 0.05,

        // x stuff
        xType: 'ordinal', // [ 'ordinal' , 'discrete' ]
        xVar: 'visit', // [ 'visit', 'timepoint' ]

        // y stuff

        // color stuff
        colorScheme: d3.schemeSet2,
        offset: 7.5,
        displayLegend: false,
        annotate: true,
        pointRadius: 5,
        strokeWidth: 3,
        fontSize: 15,
        fontWeight: 'bold',

        // animation
        play: true,
        timepoint: 0,
        measureIndex: 0,
        speed: 1000,
        pause: 5000,

        // dimensions
        width: null, // defined in ./layout/getDimensions
        widthFactor: 2,
        height: null, // defined in ./layout/getDimensions
        heightFactor: 2,
        margin: { top: 50, right: 100, bottom: 100, left: 75 },

        // miscellaneous
        footnotes: [
            //`<sup>1</sup> Displaying [aggregate] [outcome].`,
        ],
    };
}
