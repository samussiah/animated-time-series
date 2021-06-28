// Each path needs as many data points as unique timepoints in the data, regardless of
// missing or expected visits. Generate a set of coordinates with as many elements as
// timepoints in the data. For future timepoints past the current timepoint of the animation
// set the coordinates to the most recent data point on or prior to the current timepoint.
// For missing data points set the coordinates to the most recent past timepoint.
export default function d(data) {
    // 1. Sort the data in reverse chronological order.
    data.sort((a, b) => b.visit_order - a.visit_order);

    // 2. Capture the latest data point on or before the current timepoint.
    const latestVisit = data.find((d) => d.visit_order <= this.timepoint.visit_order);

    // Set timepoint past latest timepoint to latest timepoint. This way the path has as
    // many points of inflection at the first timepoint as at the last timepoint.
    //
    // 3. Generate a new set of data by mapping the visit set.
    const lineData = this.set.visit_order.map((visit_order, i) => {
        let datum;

        // 4. For future timepoints set the data point to the latest data point.
        if (visit_order >= this.timepoint.visit_order) datum = { ...latestVisit };
        // 5. For missing timepoints set the data point the closest earlier data point.
        else datum = data.find((d) => d.visit_order <= visit_order);

        return datum;
    });

    return lineData;
}
