import mutate from './data/mutate';
import nest from './data/nest';

export default function data() {
    mutateData.call(this);
    this.data.nested = nestData.call(this);
}
