import addElement from './layout/addElement';

export default function layout() {
    const fdg = this;

    const main = addElement('main', d3.select(this.element));

    return {
        main,
    };
}
