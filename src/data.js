import mutate from './data/mutate';
import set from './data/set';
import group from './data/group';

export default function data() {
    mutate.call(this);
    this.set = set.call(this);
    this.set.timepoints = this.set.visit.map((visit) =>
        d3.median(
            this.data.filter((d) => d.visit === visit),
            (d) => d.day
        )
    );
    this.group = group.call(this);
}
