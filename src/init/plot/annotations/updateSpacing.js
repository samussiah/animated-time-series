// TODO: reverse algorithm to shift text upward - add top margin as needed
//
// reposition annotations to avoid overlap
export default function updateSpacing(data) {
    const spacing = this.settings.fontSize;

    data.sort((a, b) => b.y - a.y).forEach((d, i) => {
        if (i > 0) {
            const diff = data[i - 1].y - d.y;

            if (diff < spacing) {
                d.y = d.y - (spacing - diff);
            }
        }
    });
}
