import interval from '../../init/interval';

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
    });

    return {
        div,
        button,
    };
}
