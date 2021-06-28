import update from './update';

export function iterate() {
    this.settings.timepoint++;

    if (this.settings.timepoint >= this.set.visit.length) this.settings.timepoint = 0;

    // Restart animation.
    if (this.settings.timepoint === 0) {
        this.interval?.stop();
        this.timeout?.stop();
        this.timeout = d3.timeout(() => {
            update.call(this);
            this.timeout.stop();
            this.timeout = d3.timeout(() => {
                this.interval = interval.call(this);
            }, this.settings.loop_delay);
        }, this.settings.loop_delay);
    }
    // Update each measure.
    else {
        update.call(this);
    }
}

export default function interval() {
    const interval = d3.interval(() => {
        iterate.call(this);
    }, this.settings.speed);

    return interval;
}
