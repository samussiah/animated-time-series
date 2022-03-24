export default function create(variable) {
    let group;

    switch (variable) {
        case 'measure,id':
            group = d3.groups(
                this.data,
                (d) => d.measure,
                (d) => d.id
            );
            break;
        default:
            group = d3.group(this.data, (d) => d[variable]);
            break;
    }

    return group;
}
