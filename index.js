(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.animatedTimeSeries = factory());
}(this, (function () { 'use strict';

    var settings = {
      id_var: 'USUBJID',
      visit_var: 'AVISIT',
      visit_order_var: 'AVISITN',
      day_var: 'ADY',
      measure_var: 'PARAM',
      result_var: 'AVAL',
      aggregate: 'mean',
      speed: 2500,
      loop_time: 5000
    };

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
      getDatum: getDatum,
      getValue: getValue
    };

    function addElement(name, parent) {
      var tagName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'div';
      var element = parent.append(tagName).classed("atm-".concat(name), true);
      return element;
    }

    function layout() {
      var main = addElement('main', d3.select(this.element));
      this.settings.width = main.node().clientWidth / 2;
      this.settings.widthTimeSeries = 2 * this.settings.width / 3;
      this.settings.widthPieChart = 1 * this.settings.width / 3;
      this.settings.height = this.settings.width / 3;
      this.settings.margin = {
        top: 30,
        right: 30,
        bottom: 40,
        left: 40
      };
      var timepoint = addElement('timepoint', main, 'h2');
      var charts = addElement('charts', main);
      return {
        main: main,
        timepoint: timepoint,
        charts: charts
      };
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
          d[setting.replace(/_var$/, '')] = ['visit_order_var', 'day_var', 'result_var'].includes(setting) ? +d[_this.settings[setting]] : d[_this.settings[setting]];
        });
      });
    }

    function sets() {
      var sets = {
        id: new Set(this.data.map(function (d) {
          return d.id;
        })),
        visit: new Set(this.data.map(function (d) {
          return d.visit;
        })),
        visit_order: new Set(this.data.map(function (d) {
          return d.visit_order;
        })),
        day: new Set(this.data.map(function (d) {
          return d.day;
        })),
        measure: new Set(this.data.map(function (d) {
          return d.measure;
        }))
      };
      return sets;
    }

    function groups() {
      var groups = {
        id: d3.group(this.data, function (d) {
          return d.id;
        }),
        visit: d3.group(this.data, function (d) {
          return d.visit;
        }),
        measure: d3.group(this.data, function (d) {
          return d.measure;
        })
      };
      return groups;
    }

    function data() {
      var _this = this;

      mutate.call(this);
      this.data.sets = sets.call(this);
      this.data.visits = _toConsumableArray(new Set(this.data.map(function (d) {
        return "".concat(d.visit_order, "|").concat(d.visit);
      })).values()).map(function (value) {
        return value.split('|');
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).map(function (value) {
        return value[1];
      });
      this.data.timepoints = this.data.visits.map(function (visit) {
        return d3.median(_this.data.filter(function (d) {
          return d.visit === visit;
        }), function (d) {
          return d.day;
        });
      });
      this.data.groups = groups.call(this);
    }

    function getXScale(data) {
      return d3.scaleLinear().domain(d3.extent(data, function (d) {
        return d.day;
      })).rangeRound([this.settings.margin.left, this.settings.widthTimeSeries - this.settings.margin.right]);
    }

    function getYScale(data) {
      return d3.scaleLinear().domain(d3.extent(data, function (d) {
        return d.result;
      })).nice().rangeRound([this.settings.height - this.settings.margin.bottom, this.settings.margin.top]);
    }

    function getColorScale(scale) {
      var lo = scale.domain()[0];
      var hi = scale.domain()[1];
      return d3.scaleSequential().domain([-Math.abs(hi - lo), Math.abs(hi - lo)]).interpolator(d3.interpolateViridis);
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
        return g.append('text').attr('x', marginLeft).attr('y', marginTop + marginBottom - height - 6).attr('fill', 'currentColor').attr('text-anchor', 'start').attr('font-weight', 'bold').text(title);
      });
      return svg.node();
    }

    function layout$1(measure, key) {
      var keyClass = key.toLowerCase().replace(/[^a-z0-9_]/g, '-'); // container

      var main = addElement('container', this.containers.charts).attr('width', this.settings.width).attr('height', this.settings.height); // header

      var header = addElement('header', main, 'h3').text(key); // legend

      var legend$1 = addElement('legend', main);
      legend$1.node().appendChild(legend({
        color: measure.colorScale,
        title: 'Change'
      })); // time series

      var timeSeries = addElement('time-series', main).classed('atm-svg-container', true);
      timeSeries.svg = addElement('svg', timeSeries, 'svg').attr('width', this.settings.widthTimeSeries).attr('height', this.settings.height);
      var xAxis = addElement('x-axis', timeSeries.svg, 'g');
      var yAxis = addElement('y-axis', timeSeries.svg, 'g');
      var canvas = addElement('canvas', timeSeries.svg, 'g');
      var lines = addElement('lines', canvas, 'g');
      var points = addElement('points', canvas, 'g');
      var linesAggregate = addElement('lines-aggregate', canvas, 'g');
      var pointsAggregate = addElement('points-aggregate', canvas, 'g'); // pie chart

      var pieChart = addElement('pie-chart', main).classed('atm-svg-container', true);
      pieChart.svg = addElement('svg', pieChart, 'svg').attr('width', this.settings.widthPieChart).attr('height', this.settings.height);
      return {
        main: main,
        header: header,
        legend: legend$1,
        timeSeries: timeSeries,
        xAxis: xAxis,
        yAxis: yAxis,
        canvas: canvas,
        lines: lines,
        points: points,
        linesAggregate: linesAggregate,
        pointsAggregate: pointsAggregate,
        pieChart: pieChart
      };
    }

    function xAxis(measure) {
      var _this = this;

      return measure.containers.xAxis.attr('transform', "translate(0,".concat(this.settings.height - this.settings.margin.bottom, ")")).call(d3.axisBottom(measure.xScale).ticks(this.settings.widthTimeSeries / 80)).call(function (g) {
        return g.append('text').attr('x', (_this.settings.widthTimeSeries - _this.settings.margin.left) / 2).attr('y', _this.settings.margin.bottom / 2 + 4).attr('fill', 'currentColor').attr('text-anchor', 'center').attr('alignment-baseline', 'hanging').text('Study Day');
      });
    }

    function yAxis(measure) {
      var _this = this;

      return measure.containers.yAxis.attr('transform', "translate(".concat(this.settings.margin.left, ",0)")).call(d3.axisLeft(measure.yScale)).call(function (g) {
        return g.select('.domain').remove();
      }).call(function (g) {
        return g.append('g').attr('stroke', 'currentColor').attr('stroke-opacity', 0.1).selectAll('line').data(measure.yScale.ticks()).join('line').attr('y1', function (d) {
          return 0.5 + measure.yScale(d);
        }).attr('y2', function (d) {
          return 0.5 + measure.yScale(d);
        }).attr('x1', 0).attr('x2', _this.settings.widthTimeSeries - _this.settings.margin.right - _this.settings.margin.left);
      });
    }

    function drawLines(measure) {
      var lines = measure.containers.lines.selectAll('line').data(measure.ids, function (d) {
        return d[0];
      }).join('line').attr('stroke-opacity', 0);
      return lines;
    }

    function points(measure) {
      var _this = this;

      var points = measure.containers.points.selectAll('circle').data(measure.ids, function (d) {
        return d[0];
      }).join('circle').attr('cx', function (d) {
        return measure.xScale(_this.util.getValue(d[1], 'visit', _this.visit, 'day'));
      }).attr('cy', function (d) {
        return measure.yScale(_this.util.getValue(d[1], 'visit', _this.visit, 'result'));
      }).attr('r', 1).attr('fill', measure.colorScale(0)).attr('fill-opacity', 0.25).attr('stroke', measure.colorScale(0)).attr('stroke-opacity', 0.5).style('display', function (d) {
        return _this.util.getDatum(d[1], 'visit', _this.visit) ? null : 'none';
      });
      return points;
    }

    function linesAggregate(measure) {
      var _this = this;

      var lines = measure.containers.linesAggregate.selectAll('line.atm-line-aggregate').data(d3.pairs(measure.aggregate)).join('line').classed('atm-line-aggregate', true).attr('x1', function (d, i) {
        return measure.xScale(_this.data.timepoints[i]);
      }).attr('x2', function (d, i) {
        return measure.xScale(_this.data.timepoints[i]);
      }).attr('y1', function (d) {
        return measure.yScale(d[0][1]);
      }).attr('y2', function (d) {
        return measure.yScale(d[0][1]);
      }).attr('stroke', function (d) {
        return measure.colorScale(d[1][1] - d[0][1]);
      }).attr('stroke-width', 3);
      return lines;
    }

    function pointsAggregate(measure) {
      var points = measure.containers.pointsAggregate.append('circle').datum(measure.aggregate).classed('atm-point-aggregate', true).attr('cx', measure.xScale(this.timepoint)).attr('cy', function (d) {
        return measure.yScale(d[0][1]);
      }).attr('r', 4).attr('fill', measure.colorScale(0)).attr('fill-opacity', 1).attr('stroke', 'black').attr('stroke-opacity', 1);
      return points;
    }

    function pieChart(measure) {
      measure.containers.pieChart.svg.append('circle').attr('cx', this.settings.widthPieChart / 2).attr('cy', this.settings.height / 2).attr('r', this.settings.widthPieChart / 2 - 50).attr('stroke-width', 25).attr('stroke', 'steelblue').attr('fill', 'white');
    }

    function draw(measure) {
      measure.xAxis = xAxis.call(this, measure);
      measure.yAxis = yAxis.call(this, measure);
      measure.lines = drawLines.call(this, measure);
      measure.points = points.call(this, measure);
      measure.linesAggregate = linesAggregate.call(this, measure);
      measure.pointsAggregate = pointsAggregate.call(this, measure);
      measure.pieChart = pieChart.call(this, measure);
    }

    function updateLines(measure) {
      var main = this;
      measure.lines.each(function (data) {
        var d2 = data[1].find(function (di) {
          return di.visit === main.visit;
        });
        var index = data[1].findIndex(function (di) {
          return di.visit === main.visit;
        });
        var previousVisits = data[1].slice(0, index);
        var d1 = previousVisits.pop();
        var line = d3.select(this);
        if (d1 && d2) line.attr('x1', measure.xScale(d1.ADY)).attr('y1', measure.yScale(d1.AVAL)).attr('x2', measure.xScale(d1.ADY)).attr('y2', measure.yScale(d1.AVAL)).attr('stroke', measure.colorScale(d2.AVAL - d1.AVAL)).attr('stroke-opacity', 0.25).transition().ease(d3.easeQuad).duration(2 * main.settings.speed / 5).attr('x2', measure.xScale(d2.ADY)).attr('y2', measure.yScale(d2.AVAL));else line.transition().duration(2 * main.settings.speed / 5).attr('stroke-opacity', 0);
      });
    }

    function updatePoints(measure) {
      var main = this;
      measure.points.each(function (data) {
        var d = data[1].find(function (di) {
          return di.visit === main.visit;
        });
        var baseline = data[1].find(function (d) {
          return !!d.result;
        });
        var point = d3.select(this); // Hide points that are missing

        if (main.visit === 0 && !d) point.style('display', 'none');else if (point.style('display') === 'none' && !!d) point.attr('cx', measure.xScale(d.day)).attr('cy', measure.yScale(d.result));
        var transition = point.transition().ease(d3.easeQuad).duration(2 * main.settings.speed / 5).delay(1 * main.settings.speed / 5);
        if (d) transition.attr('cx', measure.xScale(d.day)).attr('cy', measure.yScale(d.result)).attr('fill', baseline ? measure.colorScale(d.result - baseline.result) : 0).attr('fill-opacity', 0.25).attr('stroke', baseline ? measure.colorScale(d.result - baseline.result) : 0).style('display', null);else transition.attr('fill-opacity', 0.25).attr('stroke-opactiy', 0.5);
      });
    }

    function linesAggregate$1(measure) {
      var _this = this;
      measure.linesAggregate.filter(function (d, i) {
        return i === _this.visitIndex - 1;
      }).transition().duration(2 * this.settings.speed / 5).delay(1 * this.settings.speed / 5).attr('x2', function (d, i) {
        return measure.xScale(_this.timepoint);
      }).attr('y2', function (d) {
        return measure.yScale(d[1][1]);
      });

      if (this.visitIndex === 0) {
        var delay = this.settings.speed / this.data.visits.length;
        measure.linesAggregate.transition().duration(delay).delay(function (d, i) {
          return _this.settings.speed - delay * i;
        }).attr('x2', function () {
          return this.getAttribute('x1');
        }).attr('y2', function () {
          return this.getAttribute('y1');
        });
      }
    }

    function pointsAggregate$1(measure) {
      var _this = this;

      if (this.visitIndex > 0) measure.pointsAggregate.transition().ease(d3.easeQuad).duration(2 * this.settings.speed / 5).delay(2 * this.settings.speed / 5).attr('cx', measure.xScale(this.timepoint)).attr('cy', function (d) {
        return measure.yScale(d[_this.visitIndex][1]);
      }).attr('fill', function (d, i) {
        return measure.colorScale(d[_this.visitIndex][1] - d[0][1]);
      });else measure.pointsAggregate.attr('cx', measure.xScale(this.timepoint)).attr('cy', function (d) {
        return measure.yScale(d[0][1]);
      }).attr('fill', measure.colorScale(0));
      measure.pointsAggregate.clone().classed('atm-clone', true);

      if (this.visitIndex === 0) {
        var delay = this.settings.speed / this.data.visits.length;
        var clones = measure.containers.canvas.selectAll('.atm-clone');
        clones.transition().duration(delay).delay(function (d, i) {
          return delay * i;
        }).attr('fill-opacity', 0).attr('stroke-opacity', 0).remove();
      }
    }

    function update() {
      var _this = this;

      this.visitIndex = this.visitIndex >= this.data.visits.length - 1 ? 0 : this.visitIndex + 1; // not sure why this works

      if (this.visitIndex === this.data.visits.length - 1) {
        this.interval.stop();
        console.log('TIMEOUT!');
        d3.timeout(function (elapsed) {
          console.log(elapsed);
          _this.interval = d3.interval(function () {
            update.call(_this);
          }, _this.settings.speed);
        }, this.settings.loop_time);
      }

      this.visit = this.data.visits[this.visitIndex];
      this.timepoint = this.data.timepoints[this.visitIndex];
      this.containers.timepoint.transition().delay(this.settings.speed / 2).text(this.visit);
      this.data.groups.measure.forEach(function (measure, key) {
        updateLines.call(_this, measure);
        updatePoints.call(_this, measure);
        linesAggregate$1.call(_this, measure);
        pointsAggregate$1.call(_this, measure);
      });
    }

    function init() {
      var _this = this;

      this.visitIndex = 0;
      this.visit = this.data.visits[this.visitIndex];
      this.timepoint = this.data.timepoints[this.visitIndex];
      this.containers.timepoint.text(this.visit);
      this.xScale = getXScale.call(this, this.data);
      this.data.groups.measure.forEach(function (measure, key) {
        measure.xScale = _this.xScale;
        measure.yScale = getYScale.call(_this, measure);
        measure.colorScale = getColorScale.call(_this, measure.yScale);
        measure.containers = layout$1.call(_this, measure, key);
        measure.ids = d3.group(measure, function (d) {
          return d.id;
        });
        measure.aggregate = _this.data.visits.reduce(function (aggregate, visit) {
          aggregate.push([visit, d3[_this.settings.aggregate](measure.filter(function (d) {
            return d.visit === visit;
          }), function (d) {
            return d.result;
          })]);
          return aggregate;
        }, []);
        draw.call(_this, measure);
      });
      this.interval = d3.interval(function () {
        update.call(_this);
      }, this.settings.speed);
    }

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
