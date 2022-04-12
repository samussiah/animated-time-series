export default function getDimensions(settings) {
    const margin = {
        top: settings.fontSize * 2,
        right: 150,
        bottom: 55,
        left: 50
    };
    const width = 750 - margin.left - margin.right;
    const height = 250 - margin.top - margin.bottom;

    return {
        margin,
        width,
        height,
    };
}
