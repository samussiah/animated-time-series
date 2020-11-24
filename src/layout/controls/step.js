import { iterate } from '../../init/interval';

export default function step(controls) {
    const main = this;
    const container = this.util.addElement('step', controls);
    const input = this.util.addElement('button', container, 'input', ['<', '>'])
        .attr('type', 'button')
        .property('value', (d) => d);

    input.on('click', function (event, d) {
        main.settings.play = false;
        main.controls.play.input.property('value', 'play');
        if (main.interval) main.interval.stop();
        const direction = this.value;
        if (direction === '<')
            main.settings.timepoint =
                main.settings.timepoint === 0
                    ? main.set.visit.length - 2 // displays the last timepoint
                    : main.settings.timepoint - 2; // displays the previous timepoint
        iterate.call(main);
        main.layout.timepoint.transition().style('opacity', 1);
    });

    return {
        container,
        input,
    };
}
