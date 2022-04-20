import createSet from './set/create';

export default function set(data, settings) {
    const set = {};

    set.id = createSet('id', data.cleansed);
    set.stratification = createSet('stratification', data.cleansed);
    set.color = createSet('color', data.cleansed);
    set.visit = createSet('visit', data.cleansed);
    set.visit_order = createSet('visit_order', data.cleansed);
    set.day = createSet('day', data.cleansed);
    set.measure = createSet('measure', data.cleansed);

    // Sort measures.
    if (settings.measureOrder !== null && Array.isArray(settings.measureOrder))
        set.measure.sort((a, b) => {
            const aIndex = settings.measureOrder.findIndex((measure) => measure === a);
            const bIndex = settings.measureOrder.findIndex((measure) => measure === b);

            return ~aIndex && ~bIndex
                ? aIndex - bIndex
                : ~aIndex || ~bIndex
                ? -1
                : a < b
                ? -1
                : b < a
                ? 1
                : 0;
        });

    set.strata = set.stratification.reduce((curr, prev) => {
        const ids = data.raw
            .filter((d) => d[settings.stratification_var] === prev)
            .map((d) => d[settings.id_var]);

        const n = new Set(ids).size;
        curr[prev] = n;

        return curr;
    }, {});

    // Calculate median continuous timepoint of each ordinal timepoint.
    set.timepoint = set.visit.map((visit) =>
        d3.median(
            data.cleansed.filter((d) => d.visit === visit),
            (d) => d.day
        )
    );

    // Calculate horizontal offsets of strata.
    set.offsets = d3.range(
        Math.ceil(-set.stratification.length / 2) * settings.offset +
            (settings.offset / 2) * !(set.stratification.length % 2),
        Math.ceil(set.stratification.length / 2) * settings.offset +
            (settings.offset / 2) * !(set.stratification.length % 2),
        settings.offset
    );

    return set;
}
