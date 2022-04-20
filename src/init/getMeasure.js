import y from './scales/y';

export default function getMeasure(data, scales, settings) {
    const measure = {
        index: settings.measureIndex,
        data: data[settings.measureIndex],
        scales,
    };

    measure.key = measure.data[0];
    measure.scales.y = y(measure.data, [settings.dimensions.heightAdj, 0], settings);
    measure.yTicks = settings.measureYTicks.find((yTicks) => yTicks.key === measure.key);

    return measure;
}
