export default function create(variable, data) {
    let group;

    switch (variable) {
        case 'stratification,visit':
            group = d3.groups(
                data,
                (d) => d.stratification,
                (d) => d.visit
            );
            break;
        case 'measure,id':
            group = d3.groups(
                data,
                (d) => d.measure,
                (d) => d.id
            );
            break;
        default:
            group = d3.group(data, (d) => d[variable]);
            break;
    }

    return group;
}
