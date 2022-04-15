import createSet from './set/create';

export default function set(data, settings) {
    const set = {};

    set.stratification = createSet('stratification', data);
    set.color = createSet('color', data);
    set.id = createSet('id', data);
    set.visit = createSet('visit', data);
    set.visit_order = createSet('visit_order', data);
    set.day = createSet('day', data);
    set.measure = createSet('measure', data);

    // Calculate median continuous timepoint of each ordinal timepoint.
    set.timepoint = set.visit.map((visit) =>
        d3.median(
            data.filter((d) => d.visit === visit),
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
