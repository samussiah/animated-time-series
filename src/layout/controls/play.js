//import interval from '../../init/interval';

export default function play(parent) {
    const main = this;
    const container = this.util.addElement('play', parent);
    const input = this.util
        .addElement('button', container, 'input')
        .attr('type', 'button')
        .property('value', this.settings.play ? 'pause' : 'play');

    input.on('click', function (event, d) {
        // Toggle setting.
        main.settings.play = !main.settings.play;

        // Toggle control.
        d3.select(this).property('value', main.settings.play ? 'pause' : 'play');

        // Stop current timeout and/or interval.
        main.timeout?.stop();
        main.interval?.stop();

        // Ensure timepoint is displayed.
        main.layout.timepoint.transition().style('opacity', 1);

        if (main.settings.play) main.interval = interval.call(main);
    });

    return {
        container,
        input,
    };
}
