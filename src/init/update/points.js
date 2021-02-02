export default function updatePoints(measure) {
    const main = this;

    measure.groups.each(function (data,i,j) {
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
            const datum1 = pair.find(d => d.visit === main.timepoint.previous.visit);
            const point1 = g.selectAll('.atm-circle').filter(d => d === datum1);
            const datum2 = pair.find(d => d.visit === main.timepoint.visit);
            const point2 = g.selectAll('.atm-circle').filter(d => d === datum2);

            // Define temporary point.
            const pointTransition = g
                .append('circle')
                .classed('atm-circle--transition', true)
                .attr('cx', measure.xScale(datum1[main.settings.x_var]))
                .attr('cy', measure.yScale(datum1[main.settings.y_var]))
                .attr('r', 2)
                .attr('fill', measure.colorScale(datum1[main.settings.color_var]))
                .attr('fill-opacity', .25)
                .attr('stroke', measure.colorScale(datum1[main.settings.color_var]))
                .attr('stroke-opacity', .5);

            // Define transition from point 1 to point 2.
            pointTransition
                .transition()
                .duration(2*main.settings.speed/5)
                .attr('cx', measure.xScale(datum2[main.settings.x_var]))
                .attr('cy', measure.yScale(datum2[main.settings.y_var]))
                .attr('r', 2)
                .attr('fill', measure.colorScale(datum2[main.settings.color_var]))
                .attr('stroke', measure.colorScale(datum2[main.settings.color_var]))
                .on('end', () => {
                    point2.attr('r', 2);
                    pointTransition.remove();
                });

            // Transition point 1 radius to 1.
            //point1
            //    .transition()
            //    .duration(2*main.settings.speed/5)
            //    .attr('r', 1);
        }
    });

    // TODO: figure out how to transition points back to the origin visit by visit.
    if (this.timepoint.index === 0) {
        const delay = this.settings.speed / this.set.visit.length;
        measure.points
            .transition()
            .duration(delay)
            .delay((d,i) => delay * (this.set.visit.length - this.set.visit.indexOf(d.visit)))
            .attr('r', 0);
    }
}
