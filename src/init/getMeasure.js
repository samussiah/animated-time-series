import y from './scales/y';

export default function getMeasure(data, scales, settings) {
    const measure = {
        index: settings.measureIndex,
        data: data[settings.measureIndex],
        scales
    };

    measure.scales.y = y(
        measure.data,
        [settings.dimensions.heightAdj, 0],
        settings
    );

    return measure;
}
