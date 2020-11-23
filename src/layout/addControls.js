import addPlayPauseToggle from './addControls/playPauseToggle';
import addStep from './addControls/step';

export default function addControls(controls) {
    addPlayPauseToggle.call(this, controls);
    addStep.call(this, controls);
}
