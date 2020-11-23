import play from './controls/play';
import step from './controls/step';
import filters from './controls/filters';

export default function controls(main) {
    const controls = this.util.addElement('controls', main);
    const timepoint = this.util.addElement('timepoint', controls, 'span');

    this.controls = {
        play: play.call(this, controls),
        step: step.call(this, controls),
        filters: filters.call(this, controls),
    };

    return {
        controls,
        timepoint,
    };
}
