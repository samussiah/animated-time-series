import fadeIn from './timepoint/fadeIn';

export default function timepoint() {
    const timepoint = {
        index: this.settings.timepoint,
        visit: this.set.visit[this.settings.timepoint],
        visit_order: this.set.visit_order[this.settings.timepoint],
        day: this.set.timepoint[this.settings.timepoint],
    };
    timepoint.previous = this.timepoint !== undefined
        ? this.timepoint
        : timepoint;

    // Update visit text.
    this.layout.timepoint.text(timepoint.visit).call(fadeIn, this);

    return timepoint;
}
