import addElement from './addElement';
import addPlayPauseToggle from './addControls/playPauseToggle';

export default function addControls(controls) {
    const playPauseToggle = addElement('play-pause-toggle', controls);
    addPlayPauseToggle.call(this, playPauseToggle);
}
