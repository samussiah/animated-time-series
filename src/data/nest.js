export default function nest() {
    const nested = d3
        .nest()
        .key((d) => d.id)
        .entries(this.data);

    return nested;
}
