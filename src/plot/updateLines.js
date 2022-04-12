export default function updateLines(lines, scales) {
    lines
        .transition()
        .duration(
            this.settings.speed - .25*this.settings.speed*this.settings.displayCIs
        )
        .attr('d', (d) => {
            const currentTimepoint = d[1][this.settings.timepoint];
            const pathData = d[1].map((d, i) =>
                i >= this.settings.timepoint ? currentTimepoint : d
            );

            return lines.lineGenerator(pathData);
        });
}
