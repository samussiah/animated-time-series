// TODO: check out d3-interpolate-path:
//
// var line = d3.line()
//   .curve(d3.curveLinear)
//   .x(function (d) { return x(d.x); })
//   .y(function (d) { return y(d.y); });
// 
// d3.select('path.my-path')
//   .transition()
//   .duration(2000)
//   .attrTween('d', function (d) {
//     var previous = d3.select(this).attr('d');
//     var current = line(d);
//     return d3.interpolatePath(previous, current);
//   });

import d from './lines/d';

export default function drawLines(measure) {
    const lines = measure.layout.lines
        .selectAll('path')
        .data(measure.ids.map(d => d[1]))
        .join('path')
        .attr('d', data => measure.lineGenerator(d.call(this, data)))
        .attr('fill-opacity', 0)
        .attr('stroke', '#aaaaaa')
        .attr('stroke-width', .5)
        .attr('stroke-opacity', .5);

    return lines;
}
