export default function fadeOut(main) {
    // Transition text from full opacity to zero opacity to create fade-out effect.
    d3.select(this)
        .transition()
        .duration(main.settings.speed / 8)
        .delay(main.settings.speed - (main.settings.speed / 8) * 2)
        .style('opacity', 0);
}
