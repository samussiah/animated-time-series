export default function getDimensions() {

    const margin = { top: 25, right: 100, bottom: 25, left: 50 };
    const width = 500 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    return {
        margin,
        width,
        height,
    };
}
