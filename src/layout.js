import addElement from './layout/addElement';

export default function layout() {
    const main = addElement('main', d3.select(this.element));
    this.settings.width = main.node().clientWidth / 2;
    this.settings.widthTimeSeries = (2 * this.settings.width) / 3 - 10;
    this.settings.widthPieChart = (1 * this.settings.width) / 3 - 10;
    this.settings.height = this.settings.width / 3;
    this.settings.margin = { top: 30, right: 30, bottom: 40, left: 40 };
    const timepoint = addElement('timepoint', main, 'h2');
    const charts = addElement('charts', main);

    return {
        main,
        timepoint,
        charts,
    };
}
