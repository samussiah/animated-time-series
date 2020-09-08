export default function getDatum(arr, key, value) {
    return arr.find((d) => d[key] === value);
}
