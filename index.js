(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.animatedTimeSeries = factory());
}(this, (function () { 'use strict';

    function addElement(name, parent) {
      var tagName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'div';
      var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var id = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function (d, i) {
        return i;
      };
      return data ? parent.selectAll("".concat(tagName, ".atm-").concat(name, ".atm-").concat(tagName)).data(data, id).join(tagName).classed("atm-".concat(name, " atm-").concat(tagName), true) // multiple elements
      : parent.append(tagName).classed("atm-".concat(name, " atm-").concat(tagName), true); // single element
    }

    function getDatum(arr, key, value) {
      return arr.find(function (d) {
        return d[key] === value;
      });
    }

    function getValue(arr, key, value, prop) {
      var datum = getDatum(arr, key, value);
      return datum ? datum[prop] : null;
    }

    var util = {
      addElement: addElement,
      getDatum: getDatum,
      getValue: getValue
    };

    function update() {
      var _this = this;

      this.settings.footnotes = this.settings.footnotes.map(function (text) {
        return text.replace('[color]', _this.settings.color_var.replace('_', ' '));
      });
      if (this.settings.y_limits !== null) this.settings.footnotes.push("<sup>*</sup> To mitigate the effect of outliers, the range of the y-axis encompasses the ".concat(this.settings.y_limits.map(function (limit) {
        return "".concat(limit, "th");
      }).join(' through '), " quantile of the results."));
    }

    function settings() {
      return {
        update: update,
        // variable mapping
        id_var: 'USUBJID',
        visit_var: 'AVISIT',
        visit_order_var: 'AVISITN',
        day_var: 'ADY',
        measure_var: 'PARAM',
        result_var: 'AVAL',
        baseline_var: 'BASE',
        change_var: 'CHG',
        percent_change_var: 'PCHG',
        outcome: 'result',
        var_labels: {
          id: 'Participant ID',
          visit: 'Visit',
          visit_order: 'Visit Order',
          measure: 'Measure',
          result: 'Result',
          baseline: 'Baseline',
          change: 'Change',
          chg: 'Change',
          percent_change: '% Change',
          pchg: '% Change',
          fold_change: 'Fold Change',
          fchg: 'Fold Change'
        },
        // statistics
        aggregate: 'mean',
        // animation
        play: true,
        timepoint: 0,
        speed: 2500,
        loop_delay: 5000,
        // x
        x_var: 'day',
        // ['visit', 'day']
        x_type: 'linear',
        // ['ordinal', 'linear', 'log']
        // y
        y_var: 'result',
        // ['result', 'change', 'percent_change']
        y_type: 'linear',
        // ['linear', 'log']
        y_limits: null,
        // [25,75]
        // color
        color_var: 'change',
        // ['result', 'change', 'percent_change']
        color_type: 'linear',
        // ['categorical', 'linear', 'log']
        // dimensions
        width: null,
        // defined in ./layout/getDimensions
        height: null,
        // defined in ./layout/getDimensions
        margin: {},
        // miscellaneous
        footnotes: ["<sup>1</sup> The color of points represents [color] from baseline.", "<sup>2</sup> The color of lines represents [color] from the previous timepoint."]
      };
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);

      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
      }

      return keys;
    }

    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};

        if (i % 2) {
          ownKeys(Object(source), true).forEach(function (key) {
            _defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }

      return target;
    }

    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }

    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }

    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
    }

    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }

    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

      return arr2;
    }

    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function getDimensions(main) {
      var container = this.layout ? this.layout.main : main;
      this.settings.width = container.node().clientWidth / 2;
      this.settings.height = this.settings.width / 3;
      this.settings.margin = {
        top: 30,
        right: 30,
        bottom: 40,
        left: 40
      };
    }

    function timepoint() {
      var timepoint = {
        index: this.settings.timepoint,
        visit: this.set.visit[this.settings.timepoint],
        day: this.set.timepoint[this.settings.timepoint]
      }; // Update visit text.

      this.layout.timepoint.text(timepoint.visit).call(fadeIn, this.settings.speed); // Transition text from zero opacity to full opacity to create fade-in effect.

      function fadeIn(selection, speed) {
        selection.style('opacity', 0).transition().duration(speed / 8).style('opacity', 1).on('end', function () {
          fadeOut.call(this, speed);
        });
      } // Transition text from full opacity to zero opacity to create fade-out effect.


      function fadeOut(speed) {
        d3.select(this).transition().duration(speed / 8).delay(speed - speed / 8 * 2).style('opacity', 0);
      }

      return timepoint;
    }

    function updateLines(measure) {
      var main = this;
      measure.lines.each(function (data) {
        var d2 = data[1].find(function (di) {
          return di.visit === main.timepoint.visit;
        });
        var index = data[1].findIndex(function (di) {
          return di.visit === main.timepoint.visit;
        });
        var previousVisits = data[1].slice(0, index);
        var d1 = previousVisits.pop();
        var line = d3.select(this);
        if (d1 && d2) line.attr('x1', measure.xScale(d1[main.settings.x_var]) + (main.settings.x_type === 'ordinal' ? measure.xScale.bandwidth() / 2 : 0)).attr('y1', measure.yScale(d1[main.settings.y_var])).attr('x2', measure.xScale(d1[main.settings.x_var]) + (main.settings.x_type === 'ordinal' ? measure.xScale.bandwidth() / 2 : 0)).attr('y2', measure.yScale(d1[main.settings.y_var])).attr('stroke', main.settings.color_var === 'percent_change' ? measure.colorScale((d2[main.settings.y_var] - d1[main.settings.y_var]) / d1[main.settings.y_var] * 100) : measure.colorScale(d2[main.settings.y_var] - d1[main.settings.y_var])).attr('stroke-opacity', 0.25).transition().ease(d3.easeQuad).duration(2 * main.settings.speed / 5).attr('x2', measure.xScale(d2[main.settings.x_var]) + (main.settings.x_type === 'ordinal' ? measure.xScale.bandwidth() / 2 : 0)).attr('y2', measure.yScale(d2[main.settings.y_var]));else line.transition().duration(2 * main.settings.speed / 5).attr('stroke-opacity', 0);
      });
    }

    function updatePoints(measure) {
      var main = this;
      measure.points.each(function (data) {
        var d = data[1].find(function (di) {
          return di.visit === main.timepoint.visit;
        }); // TODO: more robust baseline identification

        var baseline = data[1].find(function (d) {
          return !!d.result;
        });
        var point = d3.select(this);
        if (main.timepoint.index === 0 && !d) point.style('display', 'none');else if (point.style('display') === 'none' && !!d) point.attr('cx', measure.xScale(d.day)).attr('cy', measure.yScale(d.result));
        var transition = point.transition().ease(d3.easeQuad).duration(2 * main.settings.speed / 5).delay(1 * main.settings.speed / 5).attr('fill-opacity', 0.25).attr('stroke-opacity', 0.5);
        if (d) transition.attr('cx', measure.xScale(d[main.settings.x_var]) + (main.settings.x_type === 'ordinal' ? measure.xScale.bandwidth() / 2 : 0)).attr('cy', measure.yScale(d[main.settings.y_var])).attr('fill', measure.colorScale(d[main.settings.color_var])).attr('stroke', measure.colorScale(d[main.settings.color_var]));
      });
    }

    function linesAggregate(measure) {
      var _this = this;

      measure.linesAggregate.filter(function (d, i) {
        return i === _this.timepoint.index - 1;
      }).transition().duration(2 * this.settings.speed / 5).delay(1 * this.settings.speed / 5).attr('x2', function (d, i) {
        return _this.settings.x_type === 'ordinal' ? measure.xScale(_this.timepoint.visit) + measure.xScale.bandwidth() / 2 : measure.xScale(_this.timepoint.day);
      }).attr('y2', function (d) {
        return measure.yScale(d[1][1]);
      });

      if (this.timepoint.index === 0) {
        var delay = this.settings.speed / this.set.visit.length;
        measure.linesAggregate.transition().duration(delay).delay(function (d, i) {
          return _this.settings.speed - delay * i;
        }).attr('x2', function () {
          return this.getAttribute('x1');
        }).attr('y2', function () {
          return this.getAttribute('y1');
        });
      }
    }

    function pointsAggregate(measure) {
      var _this = this;

      if (this.timepoint.index > 0) measure.pointsAggregate.transition().ease(d3.easeQuad).duration(2 * this.settings.speed / 5).delay(2 * this.settings.speed / 5).attr('cx', this.settings.x_type === 'ordinal' ? measure.xScale(this.timepoint.visit) + measure.xScale.bandwidth() / 2 : measure.xScale(this.timepoint.day)).attr('cy', function (d) {
        return measure.yScale(d[_this.timepoint.index][1]);
      }).attr('fill', function (d, i) {
        return measure.colorScale(d[_this.timepoint.index][_this.settings.color_var === 'change' ? 2 : 3]);
      });else measure.pointsAggregate.attr('cx', this.settings.x_type === 'ordinal' ? measure.xScale(this.timepoint.visit) + measure.xScale.bandwidth() / 2 : measure.xScale(this.timepoint.day)).attr('cy', function (d) {
        return measure.yScale(d[0][1]);
      }).attr('fill', measure.colorScale(0));
      measure.pointsAggregate.clone().classed('atm-clone', true);

      if (this.timepoint.index === 0) {
        var delay = this.settings.speed / this.set.visit.length;
        var clones = measure.layout.timeSeries.canvas.selectAll('.atm-clone');
        clones.transition().duration(delay).delay(function (d, i) {
          return delay * i;
        }).attr('fill-opacity', 0).attr('stroke-opacity', 0).remove();
      }
    }

    function iterate() {
      var _this = this;

      this.settings.timepoint++;
      if (this.settings.timepoint >= this.set.visit.length) this.settings.timepoint = 0;
      this.timepoint = timepoint.call(this); // Update each measure.

      this.group.measure.forEach(function (measure, key) {
        updateLines.call(_this, measure);
        updatePoints.call(_this, measure);
        linesAggregate.call(_this, measure);
        pointsAggregate.call(_this, measure);
      });
    }
    function interval() {
      var _this2 = this;

      var interval = d3.interval(function () {
        iterate.call(_this2);
      }, this.settings.speed);
      return interval;
    }

    function play(controls) {
      var main = this;
      var div = this.util.addElement('play', controls);
      var button = this.util.addElement('button', div, 'button').text(this.settings.play ? 'pause' : 'play');
      button.on('click', function (event, d) {
        main.settings.play = !main.settings.play;
        d3.select(this).text(main.settings.play ? 'pause' : 'play');
        if (main.settings.play) main.interval = interval.call(main);else main.interval.stop();
      });
      return {
        div: div,
        button: button
      };
    }

    function step(controls) {
      var main = this;
      var div = this.util.addElement('step', controls);
      var buttons = this.util.addElement('button', div, 'button', ['<', '>']).text(function (d) {
        return d;
      });
      buttons.on('click', function (event, d) {
        //main.settings.paused = true;
        //update.call(main, false, true);
        //main.controls.this.classList.toggle('atm-paused');
        //main.settings.paused = !main.settings.paused;
        //this.title = 'Play animation.';
        //main.settings.paused = true;
        //update.call(main, true, true);
        main.settings.play = false;
        main.controls.play.button.text('play');
        if (main.interval) main.interval.stop();
        var direction = this.textContent;
        if (direction === '<') main.settings.timepoint = main.settings.timepoint === 0 ? main.set.visit.length - 2 // displays the last timepoint
        : main.settings.timepoint - 2; // displays the previous timepoint

        iterate.call(main);
      });
      return {
        div: div,
        buttons: buttons
      };
    }

    function filters(controls) {}

    function controls(main) {
      var controls = this.util.addElement('controls', main);
      var timepoint = this.util.addElement('timepoint', controls, 'span');
      this.controls = {
        play: play.call(this, controls),
        step: step.call(this, controls),
        filters: filters.call(this, controls)
      };
      return {
        controls: controls,
        timepoint: timepoint
      };
    }

    function charts(main) {
      var charts = this.util.addElement('charts', main);
      return charts;
    }

    function footnotes(main) {
      var footnotes = this.util.addElement('footnotes', main, 'small');
      footnotes.html(this.settings.footnotes.join('<br>'));
      return footnotes;
    }

    function clearCanvas(measure) {
      measure.layout.timeSeries.xAxis.selectAll('*').remove();
      measure.layout.timeSeries.yAxis.selectAll('*').remove();
      measure.layout.timeSeries.lines.selectAll('*').remove();
      measure.layout.timeSeries.points.selectAll('*').remove();
      measure.layout.timeSeries.pointsAggregate.selectAll('*').remove();
      measure.layout.timeSeries.linesAggregate.selectAll('*').remove();
    }

    function xAxis(measure) {
      var _this = this;

      return measure.layout.timeSeries.xAxis.attr('transform', "translate(0,".concat(this.settings.height - this.settings.margin.bottom, ")")).call(d3.axisBottom(measure.xScale).ticks(this.settings.width / 80)).call(function (g) {
        return g.append('text').attr('x', (_this.settings.width - _this.settings.margin.left) / 2).attr('y', _this.settings.margin.bottom / 2 + 4).attr('fill', 'currentColor').attr('text-anchor', 'center').attr('alignment-baseline', 'hanging').text('Study Day');
      });
    }

    function yAxis(measure) {
      var _this = this;

      return measure.layout.timeSeries.yAxis.attr('transform', "translate(".concat(this.settings.margin.left, ",0)")).call(d3.axisLeft(measure.yScale)).call(function (g) {
        return g.select('.domain').remove();
      }).call(function (g) {
        return g.append('g').attr('stroke', 'currentColor').attr('stroke-opacity', 0.1).selectAll('line').data(measure.yScale.ticks()).join('line').attr('y1', function (d) {
          return 0.5 + measure.yScale(d);
        }).attr('y2', function (d) {
          return 0.5 + measure.yScale(d);
        }).attr('x1', 0).attr('x2', _this.settings.width - _this.settings.margin.right - _this.settings.margin.left);
      });
    }

    function drawLines(measure) {
      var lines = measure.layout.timeSeries.lines.selectAll('line').data(measure.ids, function (d) {
        return d[0];
      }).join('line').attr('stroke-opacity', 0);
      return lines;
    }

    function points(measure) {
      var _this = this;

      var points = measure.layout.timeSeries.points.selectAll('circle').data(measure.ids, function (d) {
        return d[0];
      }).join('circle').attr('cx', function (d) {
        return measure.xScale(_this.util.getValue(d[1], 'visit', _this.timepoint.visit, _this.settings.x_var)) + (_this.settings.x_type === 'ordinal' ? measure.xScale.bandwidth() / 2 : 0);
      }).attr('cy', function (d) {
        return measure.yScale(_this.util.getValue(d[1], 'visit', _this.timepoint.visit, _this.settings.y_var));
      }).attr('r', 1).attr('fill', measure.colorScale(0)).attr('fill-opacity', 0.25).attr('stroke', measure.colorScale(0)).attr('stroke-opacity', 0.5);
      return points;
    }

    function linesAggregate$1(measure) {
      var _this = this;

      var lines = measure.layout.timeSeries.linesAggregate.datum(measure.aggregate).selectAll('line.atm-line-aggregate').data(d3.pairs(measure.aggregate)).join('line').classed('atm-line-aggregate', true).attr('x1', function (d, i) {
        return _this.settings.x_type === 'ordinal' ? measure.xScale(_this.set.visit[i]) + measure.xScale.bandwidth() / 2 : measure.xScale(_this.set.timepoint[i]);
      }).attr('x2', function (d, i) {
        return _this.settings.x_type === 'ordinal' ? measure.xScale(_this.set.visit[i]) + measure.xScale.bandwidth() / 2 : measure.xScale(_this.set.timepoint[i]);
      }).attr('y1', function (d) {
        return measure.yScale(d[0][1]);
      }).attr('y2', function (d) {
        return measure.yScale(d[0][1]);
      }) //.attr('stroke', (d) => measure.colorScale(d[1][1] - d[0][1]))
      .attr('stroke', function (d) {
        var change = d[1][1] - d[0][1];
        return _this.settings.color_var === 'percent_change' ? measure.colorScale(change / d[0][1] * 100) : measure.colorScale(change);
      }).attr('stroke-width', 3);
      return lines;
    }

    function pointsAggregate$1(measure) {
      var points = measure.layout.timeSeries.pointsAggregate.append('circle').datum(measure.aggregate).classed('atm-point-aggregate', true).attr('cx', this.settings.x_type === 'ordinal' ? measure.xScale(this.timepoint.visit) + measure.xScale.bandwidth() / 2 : measure.xScale(this.timepoint.day)).attr('cy', function (d) {
        return measure.yScale(d[0][1]);
      }).attr('r', 4).attr('fill', measure.colorScale(0)).attr('fill-opacity', 1).attr('stroke', 'black').attr('stroke-opacity', 1);
      return points;
    }

    function draw(measure) {
      clearCanvas.call(this, measure);
      measure.xAxis = xAxis.call(this, measure);
      measure.yAxis = yAxis.call(this, measure);
      measure.lines = drawLines.call(this, measure);
      measure.points = points.call(this, measure);
      measure.linesAggregate = linesAggregate$1.call(this, measure);
      measure.pointsAggregate = pointsAggregate$1.call(this, measure);
    }

    function resize() {
      var _this = this;

      getDimensions.call(this);
      this.group.measure.forEach(function (measure) {
        measure.layout.timeSeries.svg.attr('width', _this.settings.width).attr('height', _this.settings.height);
        measure.xScale.rangeRound([_this.settings.margin.left, _this.settings.width - _this.settings.margin.right]);
        measure.yScale.rangeRound([_this.settings.height - _this.settings.margin.bottom, _this.settings.margin.top]);
        draw.call(_this, measure);
      });
    }

    function layout() {
      var main = this.util.addElement('main', d3.select(this.element));
      getDimensions.call(this, main); // determine widths of DOM elements based on width of main container

      var controls$1 = controls.call(this, main); //this.util.addElement('controls', main);

      var charts$1 = charts.call(this, main);
      var footnotes$1 = footnotes.call(this, main);
      window.addEventListener('resize', resize.bind(this));
      return _objectSpread2(_objectSpread2({
        main: main
      }, controls$1), {}, {
        charts: charts$1,
        footnotes: footnotes$1
      });
    }

    function mutate() {
      var _this = this;

      var numericId = this.data.every(function (d) {
        return /^-?\d+\.?\d*$/.test(d.id) || /^-?\d*\.?\d+$/.test(d.id);
      });
      this.data.forEach(function (d) {
        // Rename data variables.
        Object.keys(_this.settings).filter(function (setting) {
          return /_var$/.test(setting);
        }).forEach(function (setting) {
          d[setting.replace(/_var$/, '')] = ['visit_order_var', 'day_var', 'result_var', 'baseline_var', 'change_var', 'percent_change_var'].includes(setting) ? parseFloat(d[_this.settings[setting]]) : d[_this.settings[setting]];
        });
      });
    }

    function create(variable) {
      var set, array;

      switch (variable) {
        case 'visit':
          set = new Set(this.data.filter(function (d) {
            return !(d.visit_order % 1);
          }).map(function (d) {
            return d.visit + '|' + d.visit_order;
          }));
          array = _toConsumableArray(set.values()).sort(function (a, b) {
            return a.replace(/.*\|/, '') - b.replace(/.*\|/, '');
          }).map(function (value) {
            return value.replace(/\|.*$/, '');
          });
          break;

        default:
          set = new Set(this.data.map(function (d) {
            return d[variable];
          }));
          array = _toConsumableArray(set.values()).sort();
          break;
      }

      return array;
    }

    function set() {
      var _this = this;

      var set = {};
      set.id = create.call(this, 'id');
      set.visit = create.call(this, 'visit');
      set.day = create.call(this, 'day');
      set.measure = create.call(this, 'measure');
      set.timepoint = set.visit.map(function (visit) {
        return d3.median(_this.data.filter(function (d) {
          return d.visit === visit;
        }), function (d) {
          return d.day;
        });
      });
      return set;
    }

    function create$1(variable) {
      var group;

      switch (variable) {
        case 'measure,id':
          group = d3.groups(this.data, function (d) {
            return d.measure;
          }, function (d) {
            return d.id;
          });
          break;

        default:
          group = d3.group(this.data, function (d) {
            return d[variable];
          });
          break;
      }

      return group;
    }

    function group() {
      var group = {};
      group.id = create$1.call(this, 'id');
      group.visit = create$1.call(this, 'visit');
      group.measure = create$1.call(this, 'measure');
      group.measure_id = create$1.call(this, 'measure,id');
      return group;
    }

    function data() {
      var _this = this;

      mutate.call(this);
      this.set = set.call(this);
      this.set.timepoints = this.set.visit.map(function (visit) {
        return d3.median(_this.data.filter(function (d) {
          return d.visit === visit;
        }), function (d) {
          return d.day;
        });
      });
      this.group = group.call(this);
    }

    function getXScale(data) {
      var scale;

      switch (this.settings.x_type) {
        case 'linear':
          scale = d3.scaleLinear().domain(d3.extent(data, function (d) {
            return d.day;
          }));
          break;

        case 'ordinal':
          scale = d3.scaleBand().domain(this.set.visit);
          break;

        case 'log':
          d3.scaleLog().domain(d3.extent(data, function (d) {
            return d.day;
          }));
          break;

        default:
          alert("[ ".concat(this.settings.x_type, " ] is an invalid x-axis type.  Please choose one of [ 'linear', 'ordinal', 'log' ]."));
          break;
      }

      scale.rangeRound([this.settings.margin.left, this.settings.width - this.settings.margin.right]);
      return scale;
    }

    function getYScale(data) {
      var _this = this;

      var limits = this.settings.y_limits === null ? [0, 100] : this.settings.y_limits;
      var array = data.map(function (d) {
        return d[_this.settings.y_var];
      }).sort(function (a, b) {
        return a - b;
      });
      var domain = limits.map(function (limit) {
        return d3.quantile(array, limit / 100);
      });
      return d3.scaleLinear().domain(domain) //.nice()
      .rangeRound([this.settings.height - this.settings.margin.bottom, this.settings.margin.top]);
    }

    function getColorScale(measure) {
      var _this = this;

      var maxChange = this.settings.color_var === 'change' ? d3.max(measure, function (d) {
        return Math.abs(d[_this.settings.color_var]);
      }) : 100;
      return d3.scaleSequential().domain([-maxChange, maxChange]).interpolator(d3.interpolateViridis).clamp(true);
    }

    function ramp(color) {
      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 256;
      //DOM.canvas(n, 1);
      var canvas = document.createElement('canvas');
      canvas.width = n;
      canvas.height = 1;
      var context = canvas.getContext('2d');

      for (var i = 0; i < n; ++i) {
        context.fillStyle = color(i / (n - 1));
        context.fillRect(i, 0, 1, 1);
      }

      return canvas;
    }

    function legend() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          color = _ref.color,
          title = _ref.title,
          _ref$tickSize = _ref.tickSize,
          tickSize = _ref$tickSize === void 0 ? 6 : _ref$tickSize,
          _ref$width = _ref.width,
          width = _ref$width === void 0 ? 320 : _ref$width,
          _ref$height = _ref.height,
          height = _ref$height === void 0 ? 44 + tickSize : _ref$height,
          _ref$marginTop = _ref.marginTop,
          marginTop = _ref$marginTop === void 0 ? 18 : _ref$marginTop,
          _ref$marginRight = _ref.marginRight,
          marginRight = _ref$marginRight === void 0 ? 0 : _ref$marginRight,
          _ref$marginBottom = _ref.marginBottom,
          marginBottom = _ref$marginBottom === void 0 ? 16 + tickSize : _ref$marginBottom,
          _ref$marginLeft = _ref.marginLeft,
          marginLeft = _ref$marginLeft === void 0 ? 0 : _ref$marginLeft,
          _ref$ticks = _ref.ticks,
          ticks = _ref$ticks === void 0 ? width / 64 : _ref$ticks,
          tickFormat = _ref.tickFormat,
          tickValues = _ref.tickValues;

      var svg = d3.create('svg').attr('width', width).attr('height', height).attr('viewBox', [0, 0, width, height]).style('overflow', 'visible').style('display', 'block');

      var tickAdjust = function tickAdjust(g) {
        return g.selectAll('.tick line').attr('y1', marginTop + marginBottom - height);
      };

      var x; // Continuous

      if (color.interpolate) {
        var n = Math.min(color.domain().length, color.range().length);
        x = color.copy().rangeRound(d3.quantize(d3.interpolate(marginLeft, width - marginRight), n));
        svg.append('image').attr('x', marginLeft).attr('y', marginTop).attr('width', width - marginLeft - marginRight).attr('height', height - marginTop - marginBottom).attr('preserveAspectRatio', 'none').attr('xlink:href', ramp.call(this, color.copy().domain(d3.quantize(d3.interpolate(0, 1), n))).toDataURL());
      } // Sequential
      else if (color.interpolator) {
          x = Object.assign(color.copy().interpolator(d3.interpolateRound(marginLeft, width - marginRight)), {
            range: function range() {
              return [marginLeft, width - marginRight];
            }
          });
          svg.append('image').attr('x', marginLeft).attr('y', marginTop).attr('width', width - marginLeft - marginRight).attr('height', height - marginTop - marginBottom).attr('preserveAspectRatio', 'none').attr('xlink:href', ramp.call(this, color.interpolator()).toDataURL()); // scaleSequentialQuantile doesn’t implement ticks or tickFormat.

          if (!x.ticks) {
            if (tickValues === undefined) {
              var _n = Math.round(ticks + 1);

              tickValues = d3.range(_n).map(function (i) {
                return d3.quantile(color.domain(), i / (_n - 1));
              });
            }

            if (typeof tickFormat !== 'function') {
              tickFormat = d3.format(tickFormat === undefined ? ',f' : tickFormat);
            }
          }
        } // Threshold
        else if (color.invertExtent) {
            var thresholds = color.thresholds ? color.thresholds() // scaleQuantize
            : color.quantiles ? color.quantiles() // scaleQuantile
            : color.domain(); // scaleThreshold

            var thresholdFormat = tickFormat === undefined ? function (d) {
              return d;
            } : typeof tickFormat === 'string' ? d3.format(tickFormat) : tickFormat;
            x = d3.scaleLinear().domain([-1, color.range().length - 1]).rangeRound([marginLeft, width - marginRight]);
            svg.append('g').selectAll('rect').data(color.range()).join('rect').attr('x', function (d, i) {
              return x(i - 1);
            }).attr('y', marginTop).attr('width', function (d, i) {
              return x(i) - x(i - 1);
            }).attr('height', height - marginTop - marginBottom).attr('fill', function (d) {
              return d;
            });
            tickValues = d3.range(thresholds.length);

            tickFormat = function tickFormat(i) {
              return thresholdFormat(thresholds[i], i);
            };
          } // Ordinal
          else {
              x = d3.scaleBand().domain(color.domain()).rangeRound([marginLeft, width - marginRight]);
              svg.append('g').selectAll('rect').data(color.domain()).join('rect').attr('x', x).attr('y', marginTop).attr('width', Math.max(0, x.bandwidth() - 1)).attr('height', height - marginTop - marginBottom).attr('fill', color);

              tickAdjust = function tickAdjust() {};
            }

      svg.append('g').attr('transform', "translate(0,".concat(height - marginBottom, ")")).call(d3.axisBottom(x).ticks(ticks, typeof tickFormat === 'string' ? tickFormat : undefined).tickFormat(typeof tickFormat === 'function' ? tickFormat : undefined).tickSize(tickSize).tickValues(tickValues)).call(tickAdjust).call(function (g) {
        return g.select('.domain').remove();
      }).call(function (g) {
        var fontSize = '1rem';
        g.append('text').attr('x', marginLeft).attr('y', marginTop + marginBottom - height - 6).attr('fill', 'currentColor').attr('text-anchor', 'start').attr('font-weight', 'bold').attr('font-size', fontSize).text('-');
        g.append('text').attr('x', width / 2).attr('y', marginTop + marginBottom - height - 6).attr('fill', 'currentColor').attr('text-anchor', 'middle').attr('font-weight', 'bold').attr('font-size', fontSize).html(title);
        g.append('text').attr('x', width - marginRight).attr('y', marginTop + marginBottom - height - 6).attr('fill', 'currentColor').attr('text-anchor', 'end').attr('font-weight', 'bold').attr('font-size', fontSize).text('+');
      });
      return svg.node();
    }

    function layout$1(measure, key) {
      var keyClass = key.toLowerCase().replace(/[^a-z0-9_]/g, '-'); // container

      var main = this.util.addElement('container', this.layout.charts); // header

      var header = this.util.addElement('header', main, 'h3').text(key); // legend

      var legend$1 = this.util.addElement('legend', main);
      legend$1.node().appendChild(legend({
        color: measure.colorScale,
        title: this.settings.color_var === 'change' ? 'Change' : 'Percent Change <tspan dy = "-5" style = "font-size: 10px; font-weight: lighter">1 2</tspan>',
        width: 275
      })); // time series

      var timeSeries = this.util.addElement('time-series', main).classed('atm-svg-container', true);
      timeSeries.svg = this.util.addElement('time-series__svg', timeSeries, 'svg').attr('width', this.settings.width).attr('height', this.settings.height);
      /**/

      timeSeries.xAxis = this.util.addElement('x-axis', timeSeries.svg, 'g');
      /**/

      timeSeries.yAxis = this.util.addElement('y-axis', timeSeries.svg, 'g');
      /**/

      timeSeries.canvas = this.util.addElement('canvas', timeSeries.svg, 'g');
      var margin = 6;
      /**/

      /**/

      timeSeries.clipPath = this.util.addElement('clip-path', timeSeries.canvas, 'clipPath').attr('id', keyClass).append('rect').attr('x', this.settings.margin.left - margin).attr('y', this.settings.margin.top).attr('width', this.settings.width - this.settings.margin.left - this.settings.margin.right + margin * 2).attr('height', this.settings.height - this.settings.margin.top - this.settings.margin.bottom);
      /**/

      /**/

      timeSeries.lines = this.util.addElement('lines', timeSeries.canvas, 'g').attr('clip-path', "url(#".concat(keyClass, ")"));
      /**/

      /**/

      timeSeries.points = this.util.addElement('points', timeSeries.canvas, 'g').attr('clip-path', "url(#".concat(keyClass, ")"));
      /**/

      /**/

      timeSeries.linesAggregate = this.util.addElement('lines-aggregate', timeSeries.canvas, 'g').attr('clip-path', "url(#".concat(keyClass, ")"));
      /**/

      /**/

      timeSeries.pointsAggregate = this.util.addElement('points-aggregate', timeSeries.canvas, 'g').attr('clip-path', "url(#".concat(keyClass, ")"));
      return {
        main: main,
        header: header,
        legend: legend$1,
        timeSeries: timeSeries
      };
    }

    function init() {
      var _this = this;

      // Capture the current timepoint (index, visit, median day).
      this.timepoint = timepoint.call(this); // All charts share common x-scale.

      this.xScale = getXScale.call(this, this.data);
      this.group.measure.forEach(function (measure, key) {
        // chart scales
        measure.xScale = _this.xScale;
        measure.yScale = getYScale.call(_this, measure);
        measure.colorScale = getColorScale.call(_this, measure); // chart layout

        measure.layout = layout$1.call(_this, measure, key); // chart data: individuals

        measure.ids = d3.groups(measure, function (d) {
          return d.id;
        }); // chart data: population

        measure.aggregate = _this.set.visit.reduce(function (aggregate, visit) {
          aggregate.push([visit, d3[_this.settings.aggregate](measure.filter(function (d) {
            return d.visit === visit;
          }), function (d) {
            return d.result;
          }), // aggregate result
          d3[_this.settings.aggregate](measure.filter(function (d) {
            return d.visit === visit;
          }), function (d) {
            return d.change;
          }), // aggregate change
          d3[_this.settings.aggregate](measure.filter(function (d) {
            return d.visit === visit;
          }), function (d) {
            return d.percent_change;
          }) // aggregate percent change
          ]);
          return aggregate;
        }, []); // Generate chart.

        draw.call(_this, measure);
      }); // Start animation.

      if (this.settings.play) this.interval = interval.call(this);
    }

    function animatedTimeSeries(_data_) {
      var _element_ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'body';

      var _settings_ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var main = {
        data: _data_,
        element: _element_,
        settings: Object.assign(settings(), _settings_),
        util: util
      };
      main.settings.update.call(main); // tweak settings based on user input

      main.layout = layout.call(main); // add elements to DOM

      data.call(main); // mutate and structure data

      init.call(main); // generate the output

      return main;
    }

    return animatedTimeSeries;

})));
