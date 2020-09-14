export default function addElement(name, parent, tagName = 'div') {
    const element = parent
        .append(tagName)
        .classed(`atm-${name}`, true)
        .classed(`atm-${tagName}`, true)
        .classed(`atm-${name}__${tagName}`, true);

    return element;
}
