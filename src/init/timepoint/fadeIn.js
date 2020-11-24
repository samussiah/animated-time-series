import fadeOut from './fadeOut';

export default function fadeIn(selection, main) {
    // Transition text from zero opacity to full opacity to create fade-in effect.
    selection
        .style('opacity', 0)
        .transition()
        .duration(main.settings.speed / 8)
        .style('opacity', 1)
        .on('end', function () {
            fadeOut.call(this, main);
        });
}
