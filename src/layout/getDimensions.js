export default function getDimensions(main) {
    const container = this.layout ? this.layout.main : main;
    this.settings.width = container.node().clientWidth / 2;
    this.settings.height = this.settings.width / 3;
    this.settings.margin = { top: 30, right: 30, bottom: 40, left: 40 };
}
