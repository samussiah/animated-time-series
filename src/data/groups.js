import measure from './nest/measure';
import visit from './nest/visit';
import id from './nest/id';

export default function groups() {
    const groups = {
        id: d3.group(this.data, (d) => d.id),
        visit: d3.group(this.data, (d) => d.visit),
        measure: d3.group(
            this.data.sort((a, b) => (a.measure < b.measure ? -1 : b.measure < a.measure ? 1 : 0)),
            (d) => d.measure
        ),
    };

    return groups;
}
