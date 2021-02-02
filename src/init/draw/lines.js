export default function drawLines(measure) {
    const lines = measure.layout.lines
        .selectAll('path')
        .data(measure.ids.map(d => d[1]))
        .join('path')
        .attr('d', data => {
            // Each path needs as many data points as inflection points, i.e. one data point per
            // visit, regardless of missing or future visits.  Generate a set of coordinates with
            // as many elements as timepoints in the data.  For future timepoints set the
            // coordiantes to the most recent timepoint prior to the current timepoint.  For
            // missing data points set the coordinates to the most recent past timepoint.
            //
            // 1. Sort the data in reverse chronological order.
            // 2. Capture the latest data point on or before the current timepoint.
            // 3. Generate a new set of data by mapping the visit set.
            // 4. For future timepoints set the data point to the latest data point.
            // 5. For missing timepoints set the data point the closest earlier data point.
            data.sort((a,b) => b.visit_order - a.visit_order);

            // Get latest timepoint.
            const latestVisit = data.find(d => d.visit_order <= this.timepoint.visit_order);

            // Set timepoint past latest timepoint to latest timepoint. This way the path has as
            // many points of inflection at the first timepoint as at the last timepoint.
            const lineData = this.set.visit_order
                .map((visit_order,i) => {
                    // Get most recent timepoint on or before current visit.
                    const datum = data.find(d => d.visit_order <= visit_order);

                    return i <= datum !== undefined
                        ? datum
                        : latestVisit;
                });
            return measure.lineGenerator(lineData);
        })
        .attr('fill-opacity', 0)
        .attr('stroke', '#aaaaaa')
        .attr('stroke-width', .5);

    return lines;
}
