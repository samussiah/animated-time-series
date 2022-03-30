export default function getTimepoint(index, set) {
    const timepoint = {
        index,
        visit: set.visit[index],
        visit_order: set.visit_order[index]
    };

    return timepoint;
}
