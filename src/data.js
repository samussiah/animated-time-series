import mutate from './data/mutate';
import set from './data/set';
import group from './data/group';
import updateFilters from './data/updateFilters';

export default function data() {
    mutate.call(this);
    this.set = set.call(this);
    this.group = group.call(this);
    updateFilters.call(this); // filter options depend on set
}
