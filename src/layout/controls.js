import play from './controls/play';
import step from './controls/step';
import layoutFootnotes from './footnotes';

export default function controls(main) {
    const controls = this.util.addElement('controls', main);
    const timepoint = this.util
        .addElement('timepoint', controls)
        .classed('atm-controls-spacing', true)
        .append('span');
    const animation = this.util
        .addElement('animation', controls)
        .classed('atm-controls-spacing', true);

    this.controls = {
        play: play.call(this, animation),
        step: step.call(this, animation)
    };

    const footnotes = layoutFootnotes.call(this, controls);

    return {
        controls,
        timepoint,
        animation,
        footnotes,
    };
}
