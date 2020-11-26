import createSet from './set/create';

export default function set() {
    const set = {};

    set.id = createSet.call(this, 'id');
    set.visit = createSet.call(this, 'visit');
    set.day = createSet.call(this, 'day');
    set.measure = createSet.call(this, 'measure');

    set.timepoint = set.visit.map((visit) =>
        d3.median(
            this.data.filter((d) => d.visit === visit),
            (d) => d.day
        )
    );

    if (this.settings.filters)
        this.settings.filters.forEach((filter) => {
            set[filter.var] = createSet.call(this, filter.var);
        });

    return set;
}
