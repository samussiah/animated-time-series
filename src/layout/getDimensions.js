export default function getDimensions(parent) {
    const container = this.layout ? this.layout.charts : parent;
    this.settings.width = container.node().clientWidth / 1;
    this.settings.height = this.settings.width / 3;
    this.settings.margin = { top: 30, right: 30, bottom: 40, left: 40 };
}
