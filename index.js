(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory())
        : typeof define === 'function' && define.amd
        ? define(factory)
        : ((global = typeof globalThis !== 'undefined' ? globalThis : global || self),
          (global.animatedTimeSeries = factory()));
})(this, function () {
    'use strict';

    var settings = {};

    var util = {};

    function addElement(name, parent) {
        var tagName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'div';
        var element = parent.append(tagName).classed('fdg-'.concat(name), true);
        return element;
    }

    function layout() {
        var main = addElement('main', d3.select(this.element));
        return {
            main: main,
        };
    }

    function data() {
        mutateData.call(this);
        this.data.nested = nestData.call(this);
    }

    function init() {}

    function animatedTimeSeries(data$1) {
        var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'body';
        var settings$1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var main = {
            data: data$1,
            element: element,
            settings: Object.assign(settings, settings$1),
            util: util,
        };
        main.containers = layout.call(main); // add elements to DOM

        data.call(main); // mutate and structure data

        init.call(main); // run the animation

        return main;
    }

    return animatedTimeSeries;
});
