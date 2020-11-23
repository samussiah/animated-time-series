import util from './util/index';
import settings from './settings';
import layout from './layout';
import data from './data';
import init from './init';

export default function animatedTimeSeries(_data_, _element_ = 'body', _settings_ = {}) {
    const main = {
        data: _data_,
        element: _element_,
        settings: Object.assign(settings(), _settings_),
        util,
    };

    main.settings.update.call(main); // tweak settings based on user input
    main.layout = layout.call(main); // add elements to DOM
    data.call(main); // mutate and structure data
    init.call(main); // generate the output

    return main;
}
