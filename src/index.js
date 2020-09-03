import defaults from './settings';
import util from './util/index';
import layout from './layout';
import dataManipulation from './data';
import init from './init';

export default function animatedTimeSeries(data, element = 'body', settings = {}) {
    const main = {
        data,
        element,
        settings: Object.assign(defaults, settings),
        util,
    };

    main.containers = layout.call(main); // add elements to DOM
    dataManipulation.call(main); // mutate and structure data
    init.call(main); // run the animation

    return main;
}
