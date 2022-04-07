export default function addElement(name, parent, tagName = 'div', data = null, id = (d, i) => i) {
    return data
        ? parent
              .selectAll(`${tagName}.atm-${name}.atm-${tagName}`)
              .data(data, id)
              .join(tagName)
              .classed(`atm-${name} atm-${tagName}`, true) // multiple elements
        : parent.append(tagName).classed(`atm-${name} atm-${tagName}`, true); // single element
}
