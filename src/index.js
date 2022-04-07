import util from './util/index';
import settings from './settings';
import layout from './layout';
import data from './data';
import plot from './plot';

export default function animatedTimeSeries(_data_, _element_ = 'body', _settings_ = {}) {
    const main = {
        data: _data_,
        element: _element_,
        settings: settings().update(Object.assign(settings(), _settings_)),
        util,
    };

    main.layout = layout.call(main); // add elements to DOM
    data.call(main); // mutate and structure data
    plot.call(main); // define and render plots

    return main;
}
