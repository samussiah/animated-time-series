import attr from './points/attr';

export default function points(measure) {
    // Create one container per ID.
    const groups = measure.layout.points
        .selectAll('g')
        .data(measure.ids, (d) => d[0])
        .join('g');

    // Create one point per ID per result.
    const points = groups
        .selectAll('.atm-circle')
        .data((d) => d[1])
        .join('circle')
        .classed('atm-circle', true);

    attr.call(this, measure, points);

    return {
        groups,
        points,
    };
}
