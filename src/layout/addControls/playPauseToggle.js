import addElement from '../addElement';
import update from '../../init/update';

export default function playPauseToggle(container) {
    const main = this;

    // Add element to DOM.
    const playPause = addElement('button__play-pause', container, 'button')
        .classed('atm-paused', !this.settings.paused)
        .attr('title', this.settings.paused ? 'Play animation.' : 'Pause animation.');

    // Add event listener.
    playPause.on('click', function() {
        this.classList.toggle('atm-paused');
        main.settings.paused = !main.settings.paused;

        if (main.settings.paused) {
            main.interval.stop();
            this.title = 'Play animation.';
        } else {
            main.interval = d3.interval(() => {
                update.call(main);
            }, main.settings.speed);
            this.title = 'Pause animation.';
        }

        return false;
    });
}
