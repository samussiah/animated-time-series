d3.geomean = function (data, value = (d) => d) {
    const r = 64;
    const K = 2 ** r;
    const K1 = 2 ** -r;

    let p = 1; // product
    let n = 0; // count
    let s = 1; // sign
    let k = 0; // track exponent to prevent under/overflows

    for (let i = 0; i < data.length; i++) {
        const v = value(data[i]);
        if (+v === +v) {
            n++;
            s = Math.sign(v);
            if (s === 0) return 0;
            p *= Math.abs(v);
            while (p > K) (p *= K1), ++k;
            while (p < K1) (p *= K), --k;
        }
    }

    return n ? s * 2 ** ((Math.log2(p) + k * r) / n) : NaN;
};
