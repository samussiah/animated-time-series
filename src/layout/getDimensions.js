export default function getDimensions(container, settings) {
    const width = container.node().clientWidth / settings.widthFactor;
    const height = width / settings.heightFactor;

    return {
        width,
        height,
    };
}
