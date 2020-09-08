export default function sets() {
    const sets = {
        id: new Set(this.data.map((d) => d.id)),
        visit: new Set(this.data.map((d) => d.visit)),
        visit_order: new Set(this.data.map((d) => d.visit_order)),
        day: new Set(this.data.map((d) => d.day)),
        measure: new Set(this.data.map((d) => d.measure)),
    };

    return sets;
}
