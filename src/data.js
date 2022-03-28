import mutate from './data/mutate';
import set from './data/set';
import group from './data/group';

export default function data() {
    mutate.call(this);
    this.set = set.call(this);
    this.group = group.call(this);
    this.summary = d3.rollups(
        this.data,
        (group) => d3.sum(group, (d) => d.result),
        (d) => d.stratification,
        (d) => d.visit
    );
    this.summary.tabular = Array(this.set.stratification.length * this.set.visit.length);
    this.summary.forEach((stratum, i) => {
        stratum[1].sort((a, b) => this.set.visit.indexOf(a[0]) - this.set.visit.indexOf(b[0]));

        stratum[1].forEach((visit, j) => {
            visit.stratum = stratum;
            const datum = {
                stratum: stratum[0],
                visit: visit[0],
                value: visit[1],
            };
            this.summary.tabular[i * this.set.visit.length + j] = datum;
        });
    });
    console.log(this.summary);
}
