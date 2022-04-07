export default function create(variable, data) {
    let set, array;

    switch (variable) {
        case 'visit':
            set = new Set(
                data.filter((d) => !(d.visit_order % 1)).map((d) => d.visit + '|' + d.visit_order)
            );

            array = [...set.values()]
                .sort((a, b) => a.replace(/.*\|/, '') - b.replace(/.*\|/, ''))
                .map((value) => value.replace(/\|.*$/, ''));
            break;
        default:
            set = new Set(data.map((d) => d[variable]));
            array = [...set.values()].sort();
            break;
    }

    return array;
}
