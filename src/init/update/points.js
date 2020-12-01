export default function updatePoints(measure) {
    const main = this;

    measure.points.each(function (data,i,j) {
        const g = d3.select(this);

        // Display all points
        //const points = g.selectAll('circle.atm-circle')
        //    .filter(d => d.visit_order <= main.timepoint.visit_order)
        //    //.transition()
        //    //.delay(3*main.settings.speed/5)
        //    .style('display', null);

        // Capture data points at previous and current timepoint.
        const pair = data[1]
            .filter(d => [main.timepoint.visit, main.timepoint.previous.visit].includes(d.visit));

        // Animate from previous timepoint to current timepoint.
        if (pair.length === 2) {
            const origin = pair.find(d => d.visit === main.timepoint.previous.visit);
            console.log(origin.visit);
            const destination = pair.find(d => d.visit === main.timepoint.visit);
            console.log(destination.visit);

            // Define transition.
            const point = g.append('circle').classed('atm-circle--transition', true)
                .attr('cx', measure.xScale(origin[main.settings.x_var]))
                .attr('cy', measure.yScale(origin[main.settings.y_var]))
                .attr('r', 1)
                .attr('fill', measure.colorScale(origin[main.settings.color_var]))
                .attr('fill-opacity', .25)
                .attr('stroke', measure.colorScale(origin[main.settings.color_var]))
                .attr('stroke-opacity', .5)
            console.log(point);
            const transition = point
                .transition()
                .duration(1000)
                .attr('cx', measure.xScale(destination[main.settings.x_var]))
                .attr('cy', measure.yScale(destination[main.settings.y_var]))
                .attr('r', 2)
                .attr('fill', measure.colorScale(destination[main.settings.color_var]))
                .attr('stroke', measure.colorScale(destination[main.settings.color_var]))
                //.on('end', () => point.remove());
        }
    });
}
