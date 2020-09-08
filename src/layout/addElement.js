export default function addElement(name, parent, tagName = 'div') {
    const element = parent.append(tagName).classed(`atm-${name}`, true);

    return element;
}
