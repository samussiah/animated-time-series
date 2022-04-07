export default function mode(values, valueof) {
    let count = 0;
    let sum = 0;

    if (valueof === undefined) {
        for (let value of values) {
            if (value != null && (value = +value) >= value) {
                ++count, (sum += value);
            }
        }
    } else {
        let index = -1;
        for (let value of values) {
            if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
                ++count, (sum += value);
            }
        }
    }

    if (count) return sum / count;
}

d3.mode = function (array) {
    if (array.length == 0) return null;
    var modeMap = {};
    var maxEl = array[0],
        maxCount = 1;
    for (var i = 0; i < array.length; i++) {
        var el = array[i];
        if (modeMap[el] == null) modeMap[el] = 1;
        else modeMap[el]++;
        if (modeMap[el] > maxCount) {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }

    return maxEl;
};
