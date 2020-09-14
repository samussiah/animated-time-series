import addElement from '../addElement';

export default function playPauseToggle(container) {
    const play = addElement('button__play-pause', container, 'button')
        .attr('title', 'Pause animation.');
    //const pause = addElement('button__pause', container, 'button');
    play.on('click', function() {
        this.classList.toggle('atm-paused');
        this.title = this.classList.contains('atm-paused')
            ? 'Play animation.'
            : 'Pause animation.';
        return false;
    });
}
