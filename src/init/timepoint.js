import fadeIn from './timepoint/fadeIn';

export default function timepoint() {
    const timepoint = {
        index: this.settings.timepoint,
        visit: this.set.visit[this.settings.timepoint],
        day: this.set.timepoint[this.settings.timepoint],
    };

    // Update visit text.
    this.layout.timepoint.text(timepoint.visit).call(fadeIn, this);

    return timepoint;
}
