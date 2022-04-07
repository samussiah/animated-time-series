import mutate from './data/mutate';
import set from './data/set';
import group from './data/group';
import summarize from './data/summarize';
import timepoint from './data/timepoint';

export default function data() {
    mutate.call(this);
    this.set = set(this.data);
    this.group = group(this.data);
    this.summary = summarize(this.data, this.set, this.settings);
    this.timepoint = timepoint(this.settings.timepoint, this.set);
}
