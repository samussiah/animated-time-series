export default function getDimensions() {
    const margin = { top: 25, right: 70, bottom: 25, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    return {
        margin,
        width,
        height,
    };
}
