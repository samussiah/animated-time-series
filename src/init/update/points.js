import attr from '../draw/points/attr';

export default function updatePoints(measure) {
    const main = this;

    measure.groups.each(function (data,i,j) {
        const g = d3.select(this);

        // Capture data points at previous and current timepoint.
        const pair = data[1]
            .filter(d => [main.timepoint.visit, main.timepoint.previous.visit].includes(d.visit));

        // Animate from previous timepoint to current timepoint.
        if (pair.length === 2) {
            const datum1 = pair.find(d => d.visit === main.timepoint.previous.visit);
            const point1 = g.selectAll('.atm-circle').filter(d => d === datum1);
            const datum2 = pair.find(d => d.visit === main.timepoint.visit);
            const point2 = g.selectAll('.atm-circle').filter(d => d === datum2);

            if (main.timepoint.direction === '<') point1.attr('r', 0);

            // Define temporary point.
            const point = g
                .append('circle')
                .classed('atm-circle--transition', true)
                .datum(datum1);

            attr.call(main, measure, point);

                //.attr('cx', measure.xScale(datum1[main.settings.x_var]))
                //.attr('cy', measure.yScale(datum1[main.settings.y_var]))
                //.attr('r', 2)
                //.attr('fill', measure.colorScale(datum1[main.settings.color_var]))
                //.attr('fill-opacity', .25)
                //.attr('stroke', measure.colorScale(datum1[main.settings.color_var]))
                //.attr('stroke-opacity', .5);

            // Define transition from point 1 to point 2.
            const transition = point
                .datum(datum2)
                .transition()
                .duration(2*main.settings.speed/5);

            attr.call(main, measure, transition);
                //.attr('cx', measure.xScale(datum2[main.settings.x_var]))
                //.attr('cy', measure.yScale(datum2[main.settings.y_var]))
                //.attr('r', 2)
                //.attr('fill', measure.colorScale(datum2[main.settings.color_var]))
                //.attr('stroke', measure.colorScale(datum2[main.settings.color_var]))
            
            transition.on('end', () => {
                // Display next point if current timepoint is after previous timepoint.
                if (main.timepoint.direction === '>') point2.attr('r', 2);
                point.remove();
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
