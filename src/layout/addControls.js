import addElement from './addElement';
import addPlayPauseToggle from './addControls/playPauseToggle';
import addStep from './addControls/step';

export default function addControls(controls) {
    const playPauseToggle = addElement('play-pause-toggle', controls);
    addPlayPauseToggle.call(this, playPauseToggle);
    const step = addElement('step', controls);
    addStep.call(this, step);
}
