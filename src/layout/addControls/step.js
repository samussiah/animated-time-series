import addElement from '../addElement';
import update from '../../init/update';

export default function step(controls) {
    const main = this;

    // Add elements to DOM.
    const container = this.util.addElement('step', controls);
    const backward = this.util.addElement('button__step', container, 'button').classed(
        'atm-step--backward',
        true
    );
    const span = this.util.addElement('step-label', container, 'span').text('Step');
    const forward = this.util.addElement('button__step', container, 'button').classed(
        'atm-step--forward',
        true
    );

    // Add event listeners.
    backward.on('click', function () {
        main.settings.paused = true;
        update.call(main, false, true);

        main.controls.this.classList.toggle('atm-paused');
        main.settings.paused = !main.settings.paused;
        this.title = 'Play animation.';

        return false;
    });
    forward.on('click', function () {
        main.settings.paused = true;
        update.call(main, true, true);

        return false;
    });
}
