export default function getDimensions(settings) {
    const margin = { top: settings.fontSize * 2, right: 100, bottom: 25, left: 50 };
    const width = 500 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    return {
        margin,
        width,
        height,
    };
}
