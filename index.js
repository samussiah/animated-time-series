(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.animatedTimeSeries = factory());
}(this, (function () { 'use strict';

    var settings = {};

    var util = {};

    function addElement(name, parent) {
      var tagName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'div';
      var element = parent.append(tagName).classed("fdg-".concat(name), true);
      return element;
    }

    function layout() {
      var main = addElement('main', d3.select(this.element));
      return {
        main: main
      };
    }

    function mutate() {
      var numericId = this.data.every(function (d) {
        return /^-?\d+\.?\d*$/.test(d.id) || /^-?\d*\.?\d+$/.test(d.id);
      });
      this.data.forEach(function (d) {});
    }

    function nest() {
      var nested = d3.group().key(function (d) {
        return d.measure;
      }).entries(this.data);
      return nested;
    }

    function data() {
      mutate.call(this);
      this.data.nested = nest.call(this);
    }

    function init() {}

    function animatedTimeSeries(data$1) {
      var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'body';
      var settings$1 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var main = {
        data: data$1,
        element: element,
        settings: Object.assign(settings, settings$1),
        util: util
      };
      main.containers = layout.call(main); // add elements to DOM

      data.call(main); // mutate and structure data

      init.call(main); // run the animation

      return main;
    }

    return animatedTimeSeries;

})));
