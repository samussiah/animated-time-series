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

      if (this.settings.var_labels.stratification === null) this.settings.var_labels.stratification = this.settings.stratification_var; // Update footnotes.

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
        stratification_var: null,
        id_var: 'USUBJID',
        visit_var: 'AVISIT',
        visit_order_var: 'AVISITN',
        day_var: 'ADY',
        measure_var: 'PARAM',
        result_var: 'AVAL',
        change_var: 'CHG',
        percent_change_var: 'PCHG',
        outcome: 'result',
        var_labels: {
          stratification: null,
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
        loop_delay: 10000,
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

    function getDimensions(parent) {
      var container = this.layout ? this.layout.charts : parent;
      this.settings.width = container.node().clientWidth / 1;
      this.settings.height = this.settings.width / 3;
      this.settings.margin = {
        top: 30,
        right: 30,
        bottom: 40,
        left: 40
      };
    }

    function fadeOut(main) {
      // Transition text from full opacity to zero opacity to create fade-out effect.
      d3.select(this).transition().duration(main.settings.speed / 8).delay([0, main.set.visit.length - 1].includes(main.settings.timepoint) ? main.settings.loop_delay - main.settings.speed / 8 * 2 : main.settings.speed - main.settings.speed / 8 * 2).style('opacity', 0);
    }

    function fadeIn(selection, main) {
      // Transition text from zero opacity to full opacity to create fade-in effect.
      selection.style('opacity', 0).transition().duration(main.settings.speed / 8).style('opacity', 1).on('end', function () {
        fadeOut.call(this, main);
      });
    }

    function timepoint() {
      var timepoint = {
        index: this.settings.timepoint,
        visit: this.set.visit[this.settings.timepoint],
        visit_order: this.set.visit_order[this.settings.timepoint],
        day: this.set.timepoint[this.settings.timepoint]
      };
      timepoint.previous = this.timepoint !== undefined ? this.timepoint : timepoint;
      timepoint.direction = timepoint.index >= timepoint.previous.index ? '>' : '<'; // Update visit text.

      this.layout.timepoint.text(timepoint.visit).call(fadeIn, this);
      return timepoint;
    }

    // Each path needs as many data points as unique timepoints in the data, regardless of
    // missing or expected visits. Generate a set of coordinates with as many elements as
    // timepoints in the data. For future timepoints past the current timepoint of the animation
    // set the coordinates to the most recent data point on or prior to the current timepoint.
    // For missing data points set the coordinates to the most recent past timepoint.
    function d(data) {
      var _this = this;

      // 1. Sort the data in reverse chronological order.
      data.sort(function (a, b) {
        return b.visit_order - a.visit_order;
      }); // 2. Capture the latest data point on or before the current timepoint.

      var latestVisit = data.find(function (d) {
        return d.visit_order <= _this.timepoint.visit_order;
      }); // Set timepoint past latest timepoint to latest timepoint. This way the path has as
      // many points of inflection at the first timepoint as at the last timepoint.
      //
      // 3. Generate a new set of data by mapping the visit set.

      var lineData = this.set.visit_order.map(function (visit_order, i) {
        var datum; // 4. For future timepoints set the data point to the latest data point.

        if (visit_order >= _this.timepoint.visit_order) datum = _objectSpread2({}, latestVisit); // 5. For missing timepoints set the data point the closest earlier data point.
        else datum = data.find(function (d) {
            return d.visit_order <= visit_order;
          });
        return datum;
      });
      return lineData;
    }

    function updateLines(measure) {
      var _this = this;
      measure.lines.transition().duration(2 * this.settings.speed / 5).attr('d', function (data) {
        return measure.lineGenerator(d.call(_this, data));
      });
    }

    function attr(measure, points) {
      var _this = this;

      points.attr('cx', function (d) {
        return measure.xScale(d[_this.settings.x_var]) + (_this.settings.x_type === 'ordinal' ? measure.xScale.bandwidth() / 2 : 0);
      }).attr('cy', function (d) {
        return measure.yScale(d[_this.settings.y_var]);
      }).attr('r', function (d) {
        return d.visit_order <= _this.timepoint.visit_order ? 2 : 0;
      }).attr('fill', function (d) {
        return measure.colorScale(d[_this.settings.color_var]);
      }).attr('fill-opacity', 0.25).attr('stroke', function (d) {
        return measure.colorScale(d[_this.settings.color_var]);
      }).attr('stroke-opacity', 0.5);
    }

    function updatePoints(measure) {
      var _this = this;

      var main = this;
      measure.groups.each(function (data, i, j) {
        var g = d3.select(this); // Capture data points at previous and current timepoint.

        var pair = data[1].filter(function (d) {
          return [main.timepoint.visit, main.timepoint.previous.visit].includes(d.visit);
        }); // Animate from previous timepoint to current timepoint.

        if (pair.length === 2) {
          var datum1 = pair.find(function (d) {
            return d.visit === main.timepoint.previous.visit;
          });
          var point1 = g.selectAll('.atm-circle').filter(function (d) {
            return d === datum1;
          });
          var datum2 = pair.find(function (d) {
            return d.visit === main.timepoint.visit;
          });
          var point2 = g.selectAll('.atm-circle').filter(function (d) {
            return d === datum2;
          });
          if (main.timepoint.direction === '<') point1.attr('r', 0); // Define temporary point.

          var point = g.append('circle').classed('atm-circle--transition', true).datum(datum1);
          attr.call(main, measure, point); //.attr('cx', measure.xScale(datum1[main.settings.x_var]))
          //.attr('cy', measure.yScale(datum1[main.settings.y_var]))
          //.attr('r', 2)
          //.attr('fill', measure.colorScale(datum1[main.settings.color_var]))
          //.attr('fill-opacity', .25)
          //.attr('stroke', measure.colorScale(datum1[main.settings.color_var]))
          //.attr('stroke-opacity', .5);
          // Define transition from point 1 to point 2.

          var transition = point.datum(datum2).transition().duration(2 * main.settings.speed / 5);
          attr.call(main, measure, transition); //.attr('cx', measure.xScale(datum2[main.settings.x_var]))
          //.attr('cy', measure.yScale(datum2[main.settings.y_var]))
          //.attr('r', 2)
          //.attr('fill', measure.colorScale(datum2[main.settings.color_var]))
          //.attr('stroke', measure.colorScale(datum2[main.settings.color_var]))

          transition.on('end', function () {
            // Display next point if current timepoint is after previous timepoint.
            if (main.timepoint.direction === '>') point2.attr('r', 2);
            point.remove();
          }); // Transition point 1 radius to 1.
          //point1
          //    .transition()
          //    .duration(2*main.settings.speed/5)
          //    .attr('r', 1);
        }
      }); // TODO: figure out how to transition points back to the origin visit by visit.

      if (this.timepoint.index === 0) {
        var delay = this.settings.speed / this.set.visit.length;
        measure.points.transition().duration(delay).delay(function (d, i) {
          return delay * (_this.set.visit.length - _this.set.visit.indexOf(d.visit));
        }).attr('r', 0);
      }
    }

    function linesAggregate(measure) {
      var _this = this;

      measure.linesAggregate.filter(function (d, i) {
        return i === _this.timepoint.index - 1;
      }).transition().duration(2 * this.settings.speed / 5).delay(1 * this.settings.speed / 5).attr('x2', function (d, i) {
        return _this.settings.x_type === 'ordinal' ? measure.xScale(_this.timepoint.visit) + measure.xScale.bandwidth() / 2 : measure.xScale(_this.timepoint.day);
      }).attr('y2', function (d) {
        return measure.yScale(d[1][1]);
      }); // Transition lines back to origin.

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
        var clones = measure.layout.canvas.selectAll('.atm-clone');
        clones.transition().duration(delay).delay(function (d, i) {
          return delay * i;
        }).attr('fill-opacity', 0).attr('stroke-opacity', 0).remove();
      }
    }

    function update$1() {
      var _this = this;

      this.timepoint = timepoint.call(this);
      this.group.measure.forEach(function (measure, key) {
        updateLines.call(_this, measure);
        updatePoints.call(_this, measure);
        linesAggregate.call(_this, measure);
        pointsAggregate.call(_this, measure);
      });
    }

    function iterate() {
      var _this = this;

      this.settings.timepoint++;
      if (this.settings.timepoint >= this.set.visit.length) this.settings.timepoint = 0; // Restart animation.

      if (this.settings.timepoint === 0) {
        var _this$interval, _this$timeout;

        (_this$interval = this.interval) === null || _this$interval === void 0 ? void 0 : _this$interval.stop();
        (_this$timeout = this.timeout) === null || _this$timeout === void 0 ? void 0 : _this$timeout.stop();
        this.timeout = d3.timeout(function () {
          update$1.call(_this);

          _this.timeout.stop();

          _this.timeout = d3.timeout(function () {
            _this.interval = interval.call(_this);
          }, _this.settings.loop_delay);
        }, this.settings.loop_delay);
      } // Update each measure.
      else {
          update$1.call(this);
        }
    }
    function interval() {
      var _this2 = this;

      var interval = d3.interval(function () {
        iterate.call(_this2);
      }, this.settings.speed);
      return interval;
    }

    function play(parent) {
      var main = this;
      var container = this.util.addElement('play', parent);
      var input = this.util.addElement('button', container, 'input').attr('type', 'button').property('value', this.settings.play ? 'pause' : 'play');
      input.on('click', function (event, d) {
        var _main$timeout, _main$interval;

        // Toggle setting.
        main.settings.play = !main.settings.play; // Toggle control.

        d3.select(this).property('value', main.settings.play ? 'pause' : 'play'); // Stop current timeout and/or interval.

        (_main$timeout = main.timeout) === null || _main$timeout === void 0 ? void 0 : _main$timeout.stop();
        (_main$interval = main.interval) === null || _main$interval === void 0 ? void 0 : _main$interval.stop(); // Ensure timepoint is displayed.

        main.layout.timepoint.transition().style('opacity', 1);
        if (main.settings.play) main.interval = interval.call(main);
      });
      return {
        container: container,
        input: input
      };
    }

    function step(parent) {
      var main = this;
      var container = this.util.addElement('step', parent);
      var input = this.util.addElement('button', container, 'input', ['<', '>']).attr('type', 'button').property('value', function (d) {
        return d;
      });
      input.on('click', function (event, d) {
        main.settings.play = false;
        main.controls.play.input.property('value', 'play');
        if (main.interval) main.interval.stop();
        var direction = this.value;
        if (direction === '<') main.settings.timepoint = main.settings.timepoint === 0 ? main.set.visit.length - 2 // displays the last timepoint
        : main.settings.timepoint - 2; // displays the previous timepoint

        iterate.call(main);
        main.layout.timepoint.transition().style('opacity', 1);
      });
      return {
        container: container,
        input: input
      };
    }

    function footnotes(main) {
      var footnotes = this.util.addElement('footnotes', main, 'small');
      footnotes.html(this.settings.footnotes.join('<br>'));
      return footnotes;
    }

    function controls(main) {
      var controls = this.util.addElement('controls', main);
      var timepoint = this.util.addElement('timepoint', controls).classed('atm-controls-spacing', true).append('span');
      var animation = this.util.addElement('animation', controls).classed('atm-controls-spacing', true);
      this.controls = {
        play: play.call(this, animation),
        step: step.call(this, animation)
      };
      var footnotes$1 = footnotes.call(this, controls);
      return {
        controls: controls,
        timepoint: timepoint,
        animation: animation,
        footnotes: footnotes$1
      };
    }

    function charts(main) {
      var charts = this.util.addElement('charts', main);
      return charts;
    }

    function clearCanvas(measure) {
      measure.layout.xAxis.selectAll('*').remove();
      measure.layout.yAxis.selectAll('*').remove();
      measure.layout.lines.selectAll('*').remove();
      measure.layout.points.selectAll('*').remove();
      measure.layout.pointsAggregate.selectAll('*').remove();
      measure.layout.linesAggregate.selectAll('*').remove();
    }

    function xAxis(measure) {
      var _this = this;

      return measure.layout.xAxis.attr('transform', "translate(0,".concat(this.settings.height - this.settings.margin.bottom, ")")).call(d3.axisBottom(measure.xScale).ticks(this.settings.width / 80)).call(function (g) {
        return g.append('text').attr('x', (_this.settings.width - _this.settings.margin.left) / 2).attr('y', _this.settings.margin.bottom / 2 + 4).attr('fill', 'currentColor').attr('text-anchor', 'center').attr('alignment-baseline', 'hanging').text('Study Day');
      });
    }

    function yAxis(measure) {
      var _this = this;

      return measure.layout.yAxis.attr('transform', "translate(".concat(this.settings.margin.left, ",0)")).call(d3.axisLeft(measure.yScale)).call(function (g) {
        return g.select('.domain').remove();
      }).call(function (g) {
        return g.append('g').attr('stroke', 'currentColor').attr('stroke-opacity', 0.1).selectAll('line').data(measure.yScale.ticks()).join('line').attr('y1', function (d) {
          return 0.5 + measure.yScale(d);
        }).attr('y2', function (d) {
          return 0.5 + measure.yScale(d);
        }).attr('x1', 0).attr('x2', _this.settings.width - _this.settings.margin.right - _this.settings.margin.left);
      });
    }

    // TODO: check out d3-interpolate-path:
    function drawLines(measure) {
      var _this = this;

      var lines = measure.layout.lines.selectAll('path').data(measure.ids.map(function (d) {
        return d[1];
      })).join('path').attr('d', function (data) {
        return measure.lineGenerator(d.call(_this, data));
      }).attr('fill-opacity', 0).attr('stroke', '#aaaaaa').attr('stroke-width', 0.5).attr('stroke-opacity', 0.5);
      return lines;
    }

    function points(measure) {
      // Create one container per ID.
      var groups = measure.layout.points.selectAll('g').data(measure.ids, function (d) {
        return d[0];
      }).join('g'); // Create one point per ID per result.

      var points = groups.selectAll('.atm-circle').data(function (d) {
        return d[1];
      }).join('circle').classed('atm-circle', true);
      attr.call(this, measure, points);
      return {
        groups: groups,
        points: points
      };
    }

    function attr$1(measure, lines) {
      var _this = this;

      lines.attr('x1', function (d, i) {
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
    }

    function linesAggregate$1(measure) {
      var lines = measure.layout.linesAggregate.datum(measure.aggregate).selectAll('line.atm-line-aggregate').data(d3.pairs(measure.aggregate)).join('line').classed('atm-line-aggregate', true);
      attr$1.call(this, measure, lines);
      return lines;
    }

    function pointsAggregate$1(measure) {
      var points = measure.layout.pointsAggregate.append('circle').datum(measure.aggregate).classed('atm-point-aggregate', true).attr('cx', this.settings.x_type === 'ordinal' ? measure.xScale(this.timepoint.visit) + measure.xScale.bandwidth() / 2 : measure.xScale(this.timepoint.day)).attr('cy', function (d) {
        return measure.yScale(d[0][1]);
      }).attr('r', 4).attr('fill', measure.colorScale(0)).attr('fill-opacity', 1).attr('stroke', 'black').attr('stroke-opacity', 1);
      return points;
    }

    function draw(measure) {
      clearCanvas.call(this, measure);
      measure.xAxis = xAxis.call(this, measure);
      measure.yAxis = yAxis.call(this, measure);
      measure.lines = drawLines.call(this, measure);

      var _drawPoints$call = points.call(this, measure),
          groups = _drawPoints$call.groups,
          points$1 = _drawPoints$call.points;

      measure.groups = groups;
      measure.points = points$1;
      measure.linesAggregate = linesAggregate$1.call(this, measure);
      measure.pointsAggregate = pointsAggregate$1.call(this, measure);
    }

    function resize() {
      var _this = this;

      getDimensions.call(this);
      this.group.measure.forEach(function (measure) {
        measure.layout.svg.attr('width', _this.settings.width).attr('height', _this.settings.height);
        measure.xScale.rangeRound([_this.settings.margin.left, _this.settings.width - _this.settings.margin.right]);
        measure.yScale.rangeRound([_this.settings.height - _this.settings.margin.bottom, _this.settings.margin.top]);
        draw.call(_this, measure);
      });
    }

    function layout() {
      var main = this.util.addElement('main', d3.select(this.element));
      var controls$1 = controls.call(this, main); //this.util.addElement('controls', main);

      var charts$1 = charts.call(this, main);
      getDimensions.call(this, charts$1); // determine widths of DOM elements based on width of main container

      window.addEventListener('resize', resize.bind(this));
      return _objectSpread2(_objectSpread2({
        main: main
      }, controls$1), {}, {
        charts: charts$1
      });
    }

    function mutate() {
      var _this = this;

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
      set.stratification = create.call(this, 'stratification');
      console.log(set.stratification);
      set.id = create.call(this, 'id');
      set.visit = create.call(this, 'visit');
      set.visit_order = create.call(this, 'visit_order');
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
      group.stratification = create$1.call(this, 'stratification');
      group.id = create$1.call(this, 'id');
      group.visit = create$1.call(this, 'visit');
      group.measure = create$1.call(this, 'measure');
      group.measure_id = create$1.call(this, 'measure,id');
      return group;
    }

    function data() {
      mutate.call(this);
      this.set = set.call(this);
      this.group = group.call(this);
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
      //init.call(main); // generate the output

      return main;
    }

    return animatedTimeSeries;

})));
