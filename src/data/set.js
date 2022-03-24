import createSet from './set/create';

export default function set() {
    const set = {};

    set.stratification = createSet.call(this, 'stratification');
    console.log(set.stratification);
    set.id = createSet.call(this, 'id');
    set.visit = createSet.call(this, 'visit');
    set.visit_order = createSet.call(this, 'visit_order');
    set.day = createSet.call(this, 'day');
    set.measure = createSet.call(this, 'measure');

    set.timepoint = set.visit.map((visit) =>
        d3.median(
            this.data.filter((d) => d.visit === visit),
            (d) => d.day
        )
    );

    return set;
}
