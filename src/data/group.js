import createGroup from './group/create';

export default function group() {
    const group = {};

    group.stratification = createGroup.call(this, 'stratification');
    group.id = createGroup.call(this, 'id');
    group.visit = createGroup.call(this, 'visit');
    group.measure = createGroup.call(this, 'measure');
    group.measure_id = createGroup.call(this, 'measure,id');

    return group;
}
