import createSet from './set/create';

export default function set(data) {
    const set = {};

    set.stratification = createSet('stratification', data);
    set.color = createSet('color', data);
    set.id = createSet('id', data);
    set.visit = createSet('visit', data);
    set.visit_order = createSet('visit_order', data);
    set.day = createSet('day', data);
    set.measure = createSet('measure', data);

    set.timepoint = set.visit.map((visit) =>
        d3.median(
            data.filter((d) => d.visit === visit),
            (d) => d.day
        )
    );
    console.table(set.timepoint);

    return set;
}
