import getDatum from './getDatum';

export default function getValue(arr, key, value, prop) {
    const datum = getDatum(arr, key, value);

    return datum ? datum[prop] : null;
}
