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

        // variable labels
        varLabels: {
            stratification: null,
            color_var: null,
            id: 'Participant ID',
            visit: 'Visit',
            visit_order: 'Visit Order',
            day: 'Study Day',
            measure: 'Measure',
            result: 'Result',
        },

        // panel
        measureOrder: [], // array of strings
        measureYTicks: [], // array of arrays with measure value and y-axis tick values

        // x
        xType: 'ordinal', // [ 'ordinal' , 'discrete' ]
        xVar: 'visit', // [ 'visit', 'timepoint' ]
        xLabel: 'Visit',
        rotateXTickLabels: true,

        // y
        yType: 'continuous',
        yVar: 'result',
        yLabel: null,
        aggregate: 'mean', // [ 'mean', 'median', 'geomean', 'deviation' ]
        aggregateLabels: {
            mean: 'Mean',
            median: 'Median',
            geomean: 'Geometric Mean',
            deviation: 'Standard Deviation',
        },
        displayCIs: true, // applies only to mean and geometric mean
        alpha: 0.05,

        // stratification and color
        colorScheme: d3.schemeSet2,
        displayLegend: false,
        annotate: true,
        offset: 7.5,

        // aesthetics
        pointRadius: 5,
        strokeWidth: 3,
        fontSize: 15,
        fontWeight: 'bold',

        // animation
        play: true,
        timepoint: 0,
        measureIndex: 0,
        measureOrder: [],
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
