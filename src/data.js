import mutate from './data/mutate';
import sets from './data/sets';
import groups from './data/groups';

export default function data() {
    mutate.call(this);
    this.data.sets = sets.call(this);
    this.data.visits = [...new Set(this.data.map((d) => `${d.visit_order}|${d.visit}`)).values()]
        .map((value) => value.split('|'))
        .sort((a, b) => a[0] - b[0])
        .map((value) => value[1]);
    this.data.timepoints = this.data.visits.map((visit) =>
        d3.median(
            this.data.filter((d) => d.visit === visit),
            (d) => d.day
        )
    );
    this.data.groups = groups.call(this);
}
