import createGroup from './group/create';

export default function group(data) {
    const group = {};

    group.stratification = createGroup('stratification', data);
    group.stratification_visit = createGroup('stratification,visit', data);
    group.color = createGroup('color', data);
    group.id = createGroup('id', data);
    group.visit = createGroup('visit', data);
    group.measure = createGroup('measure', data);
    group.measure_id = createGroup('measure,id', data);

    return group;
}
