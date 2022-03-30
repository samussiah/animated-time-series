export default function updateLines(lines, scales) {
    lines
        .transition()
        .duration(this.settings.speed)
        .attr('d', (d) => {
            console.log(d);
            const currentTimepoint = d[1][this.settings.timepoint];
            const pathData = d[1].map((d, i) =>
                i >= this.settings.timepoint ? currentTimepoint : d
            );

            return lines.lineGenerator(pathData);
        });
}
