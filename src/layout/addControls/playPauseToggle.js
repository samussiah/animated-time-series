import update from '../../init/update';
//import interval from '../../init/interval';

export default function play(controls) {
    const main = this;
    const div = this.util.addElement('play', controls);
    const button = this.util
        .addElement('button', div, 'button')
        .text(this.settings.play ? 'pause' : 'play');

    button.on('click', function (event, d) {
        main.settings.play = !main.settings.play;
        d3.select(this).text(main.settings.play ? 'pause' : 'play');
        if (main.settings.play) main.interval = interval.call(main);
        else main.interval.stop();

        this.classList.toggle('atm-play');

        if (main.settings.play) {
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

    return {
        div,
        button,
    };
}

//export default function playPauseToggle(controls) {
//    const main = this;
//
//    // Add element to DOM.
//    const container = this.util.addElement('play-pause-toggle', controls);
//    const control = this.util.addElement('button__play-pause', container, 'button')
//        .classed('atm-play', !this.settings.play)
//        .attr('title', this.settings.play ? 'Play animation.' : 'Pause animation.');
//
//    // Add event listener.
//    control.on('click', function () {
//        this.classList.toggle('atm-play');
//        main.settings.play = !main.settings.play;
//
//        if (main.settings.play) {
//            main.interval.stop();
//            this.title = 'Play animation.';
//        } else {
//            main.interval = d3.interval(() => {
//                update.call(main);
//            }, main.settings.speed);
//            this.title = 'Pause animation.';
//        }
//
//        return false;
//    });
//}
