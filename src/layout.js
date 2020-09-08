import addElement from './layout/addElement';

export default function layout() {
    const main = addElement('main', d3.select(this.element));
    this.settings.width = main.node().clientWidth / 2;
    this.settings.height = this.settings.width / 3;
    this.settings.margin = { top: 25, right: 10, bottom: 40, left: 60 };
    const timepoint = addElement('timepoint', main, 'h2');

    return {
        main,
        timepoint,
    };
}
