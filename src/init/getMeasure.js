export default function getMeasure(index, data, scales, dimensions) {
    const measure = {
        index,
        data: data[index],
        scales: scales.map(scale => scale.copy())
    };
    console.log(measure);
    measure.scales.y = scales.y(
        measure.data,
        [dimensions.heightAdj, 0]
    );

    return measure;
}
