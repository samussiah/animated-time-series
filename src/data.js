import mutate from './data/mutate';
import nest from './data/nest';

export default function data() {
    mutate.call(this);
    this.data.nested = nest.call(this);
}
