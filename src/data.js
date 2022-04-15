import mutate from './data/mutate';
import set from './data/set';
import nest from './data/nest';

export default function data() {
    this.data.cleansed = mutate.call(this,
        this.data.raw,
        this.settings
    );
    this.data.set = set.call(this,
        this.data.cleansed,
        this.settings
    );
    this.data.nested = nest.call(this,
        this.data.cleansed,
        this.data.set,
        this.settings
    );
}
