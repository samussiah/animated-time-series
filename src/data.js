import mutate from './data/mutate';
import set from './data/set';
import group from './data/group';

export default function data() {
    mutate.call(this);
    this.set = set.call(this);
    this.group = group.call(this);
}
