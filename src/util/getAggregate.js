import getValue from './getValue';

export default function getAggregate(data, key, value, prop, statistic = 'mean') {
    const values = data.map((d) => getValue(d[1], key, value, prop));
    const stat = d3[statistic](values);

    return stat;
}
