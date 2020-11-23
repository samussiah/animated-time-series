export default function timepoint() {
    const timepoint = {
        index: this.settings.timepoint,
        visit: this.set.visit[this.settings.timepoint],
        day: this.set.timepoint[this.settings.timepoint],
    };

    // Update visit text.
    this.layout.timepoint
        .text(timepoint.visit)
        .call(fadeIn, this.settings.speed);

    // Transition text from zero opacity to full opacity to create fade-in effect.
    function fadeIn(selection, speed) {
        selection
            .style('opacity', 0)
            .transition()
            .duration(speed / 8)
            .style('opacity', 1)
            .on('end', function () {
                fadeOut.call(this, speed);
            });
    }

    // Transition text from full opacity to zero opacity to create fade-out effect.
    function fadeOut(speed) {
        d3.select(this)
            .transition()
            .duration(speed / 8)
            .delay(speed - (speed / 8) * 2)
            .style('opacity', 0);
    }

    return timepoint;
}
