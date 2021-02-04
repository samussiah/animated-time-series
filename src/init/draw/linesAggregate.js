import attr from './linesAggregate/attr';
export default function linesAggregate(measure) {
    const lines = measure.layout.linesAggregate
        .datum(measure.aggregate)
        .selectAll('line.atm-line-aggregate')
        .data(d3.pairs(measure.aggregate))
        .join('line')
        .classed('atm-line-aggregate', true);

    attr.call(this, measure, lines);

    return lines;
}
