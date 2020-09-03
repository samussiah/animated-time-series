export default function mutate() {
    const numericId = this.data.every(
        (d) => /^-?\d+\.?\d*$/.test(d.id) || /^-?\d*\.?\d+$/.test(d.id)
    );

    this.data.forEach((d) => {});
}
