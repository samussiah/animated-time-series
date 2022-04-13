import mutate from './data/mutate';
import set from './data/set';
import group from './data/group';
import summarize from './data/summarize';
import timepoint from './data/timepoint';

export default function data() {
    mutate.call(this);
    this.set = set(this.data);

    this.set.offsets = d3.range(
        Math.ceil(-this.set.stratification.length / 2) * this.settings.offset +
            (this.settings.offset / 2) * !(this.set.stratification.length % 2),
        Math.ceil(this.set.stratification.length / 2) * this.settings.offset +
            (this.settings.offset / 2) * !(this.set.stratification.length % 2),
        this.settings.offset
    );

    this.group = group(this.data);
    this.summary = summarize(this.data, this.set, this.settings);
    this.timepoint = timepoint(this.settings.timepoint, this.set);
    this.measureIndex = 0;
    this.measure = this.summary[this.measureIndex];
}
