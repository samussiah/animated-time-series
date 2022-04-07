(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.animatedTimeSeries = factory());
}(this, (function () { 'use strict';

    d3.geomean = function (data) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (d) {
        return d;
      };
      var r = 64;
      var K = Math.pow(2, r);
      var K1 = Math.pow(2, -r);
      var p = 1; // product

      var n = 0; // count

      var s = 1; // sign

      var k = 0; // track exponent to prevent under/overflows

      for (var i = 0; i < data.length; i++) {
        var v = value(data[i]);

        if (+v === +v) {
          n++;
          s = Math.sign(v);
          if (s === 0) return 0;
          p *= Math.abs(v);

          while (p > K) {
            p *= K1, ++k;
          }

          while (p < K1) {
            p *= K, --k;
          }
        }
      }

      return n ? s * Math.pow(2, (Math.log2(p) + k * r) / n) : NaN;
    };

    d3.mode = function (array) {
      if (array.length == 0) return null;
      var modeMap = {};
      var maxEl = array[0],
          maxCount = 1;

      for (var i = 0; i < array.length; i++) {
        var el = array[i];
        if (modeMap[el] == null) modeMap[el] = 1;else modeMap[el]++;

        if (modeMap[el] > maxCount) {
          maxEl = el;
          maxCount = modeMap[el];
        }
      }

      return maxEl;
    };

    function addElement(name, parent) {
      var tagName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'div';
      var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var id = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function (d, i) {
        return i;
      };
      return data ? parent.selectAll("".concat(tagName, ".atm-").concat(name, ".atm-").concat(tagName)).data(data, id).join(tagName).classed("atm-".concat(name, " atm-").concat(tagName), true) // multiple elements
      : parent.append(tagName).classed("atm-".concat(name, " atm-").concat(tagName), true); // single element
    }

    var util = {
      addElement: addElement
    };

    function update(settings) {
      // Set stratification variable to whatever.
      //if (settings.stratification_var === null)
      //    settings.stratificaton_var = '?';//settings.stratification_var;
      // Set color variable to stratification variable if null.
      if (settings.color_var === null) settings.color_var = settings.stratification_var; //

      if (settings.var_labels.stratification === null) settings.var_labels.stratification = settings.stratification_var; // Update footnotes.

      settings.footnotes = settings.footnotes.map(function (text) {
        return text.replace('[aggregate]', settings.aggregate).replace('[outcome]', settings.outcome);
      });
      return settings;
    }

    function settings() {
      return {
        update: update,
        // variable mapping
        stratification_var: null,
        color_var: null,
        id_var: 'USUBJID',
        visit_var: 'AVISIT',
        visit_order_var: 'AVISITN',
        day_var: 'ADY',
        measure_var: 'PARAM',
        result_var: 'AVAL',
        var_labels: {
          stratification: null,
          color_var: null,
          id: 'Participant ID',
          visit: 'Visit',
          visit_order: 'Visit Order',
          measure: 'Measure',
          result: 'Result'
        },
        // statistics
        aggregate: 'mean',
        // animation
        play: true,
        timepoint: 0,
        speed: 1000,
        loop_delay: 10000,
        // dimensions
        width: null,
        // defined in ./layout/getDimensions
        height: null,
        // defined in ./layout/getDimensions
        margin: {},
        // miscellaneous
        annotate: true,
        fontSize: 15,
        fontWeight: 'bold',
        footnotes: [//`<sup>1</sup> Displaying [aggregate] [outcome].`,
        ]
      };
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

    function charts(main) {
      var charts = this.util.addElement('charts', main);
      return charts;
    }

    function resize() {
      getDimensions.call(this); //this.group.measure.forEach((measure) => {
      //    measure.layout.svg.attr('width', this.settings.width).attr('height', this.settings.height);
      //    measure.xScale.rangeRound([
      //        this.settings.margin.left,
      //        this.settings.width - this.settings.margin.right,
      //    ]);
      //    measure.yScale.rangeRound([
      //        this.settings.height - this.settings.margin.bottom,
      //        this.settings.margin.top,
      //    ]);
      //    draw.call(this, measure);
      //});
    }

    function layout() {
      var main = this.util.addElement('main', d3.select(this.element)); //const controls = layoutControls.call(this, main); //this.util.addElement('controls', main);

      var charts$1 = charts.call(this, main);
      getDimensions.call(this, charts$1); // determine widths of DOM elements based on width of main container

      window.addEventListener('resize', resize.bind(this));
      return {
        main: main,
        //...controls,
        charts: charts$1
      };
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

    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it;

      if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
          if (it) o = it;
          var i = 0;

          var F = function () {};

          return {
            s: F,
            n: function () {
              if (i >= o.length) return {
                done: true
              };
              return {
                done: false,
                value: o[i++]
              };
            },
            e: function (e) {
              throw e;
            },
            f: F
          };
        }

        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }

      var normalCompletion = true,
          didErr = false,
          err;
      return {
        s: function () {
          it = o[Symbol.iterator]();
        },
        n: function () {
          var step = it.next();
          normalCompletion = step.done;
          return step;
        },
        e: function (e) {
          didErr = true;
          err = e;
        },
        f: function () {
          try {
            if (!normalCompletion && it.return != null) it.return();
          } finally {
            if (didErr) throw err;
          }
        }
      };
    }

    function create(variable, data) {
      var set, array;

      switch (variable) {
        case 'visit':
          set = new Set(data.filter(function (d) {
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
          set = new Set(data.map(function (d) {
            return d[variable];
          }));
          array = _toConsumableArray(set.values()).sort();
          break;
      }

      return array;
    }

    function set(data) {
      var set = {};
      set.stratification = create('stratification', data);
      set.color = create('color', data);
      set.id = create('id', data);
      set.visit = create('visit', data);
      set.visit_order = create('visit_order', data);
      set.day = create('day', data);
      set.measure = create('measure', data);
      set.timepoint = set.visit.map(function (visit) {
        return d3.median(data.filter(function (d) {
          return d.visit === visit;
        }), function (d) {
          return d.day;
        });
      });
      console.table(set.timepoint);
      return set;
    }

    function create$1(variable, data) {
      var group;

      switch (variable) {
        case 'stratification,visit':
          group = d3.groups(data, function (d) {
            return d.stratification;
          }, function (d) {
            return d.visit;
          });
          break;

        case 'measure,id':
          group = d3.groups(data, function (d) {
            return d.measure;
          }, function (d) {
            return d.id;
          });
          break;

        default:
          group = d3.group(data, function (d) {
            return d[variable];
          });
          break;
      }

      return group;
    }

    function group(data) {
      var group = {};
      group.stratification = create$1('stratification', data);
      group.stratification_visit = create$1('stratification,visit', data);
      group.color = create$1('color', data);
      group.id = create$1('id', data);
      group.visit = create$1('visit', data);
      group.measure = create$1('measure', data);
      group.measure_id = create$1('measure,id', data);
      return group;
    }

    function summarize(data, set, settings) {
      // Nest data by measure, stratification, and visit and average results.
      var nested = d3.rollups(data, function (group) {
        return {
          data: group,
          value: d3[settings.aggregate](group, function (d) {
            return d.result;
          })
        };
      }, function (d) {
        return d.measure;
      }, // facet
      function (d) {
        return d.stratification;
      }, // color
      function (d) {
        return d.visit;
      } // x,y
      ); // TODO: define a more complex nested value that includes the data, the summarized value, and
      // the color of the stratification variable, and anything else needed.
      // Iterate over measures to generate tabular summary.

      nested.forEach(function (measure, i) {
        // Create array with as many elements as stratification and visit values combined.
        var tabular = Array(set.stratification.length * set.visit.length); // TODO: handle missing strata for given measure
        // Iterate over strata within measure.

        set.stratification.forEach(function (stratum, i) {
          var stratumDatum = measure[1].find(function (d) {
            return d[0] === stratum;
          }); // Sort visit-level summary.

          if (stratumDatum) stratumDatum[1].sort(function (a, b) {
            return set.visit.indexOf(a[0]) - set.visit.indexOf(b[0]);
          });
          stratumDatum.color_value = stratumDatum[1][0][1].data[0][settings.color_var]; // Iterate over visits within strata.

          set.visit.forEach(function (visit, j) {
            // Return data for given measure / stratum / visit.
            var visitDatum = stratumDatum[1].find(function (d) {
              return d[0] === visit;
            }); // TODO: what if measure is not captured at first visit?  Use next visit?
            // If measure is not captured at given visit, use previous visit.

            if (visitDatum === undefined) {
              visitDatum = _toConsumableArray(stratumDatum[1][j - 1]);
              stratumDatum[1].splice(j, 0, visitDatum);
            } // Attach stratum-level data to visit.


            visitDatum.stratum = stratumDatum; // Define "row" in tabular summary.

            var datum = {
              measure: measure[0],
              stratum: stratumDatum[0],
              visit: visitDatum[0],
              value: visitDatum[0] === visit ? visitDatum[1].value : null
            };
            tabular[i * set.visit.length + j] = datum;
          });
        });
        measure.tabular = tabular.filter(function (d) {
          return true;
        }); // remove empty elements

        measure.visits = _toConsumableArray(new Set(measure.tabular.map(function (d) {
          return d.visit;
        })).values());
      });
      return nested;
    }

    function timepoint(index, set) {
      var timepoint = {
        index: index,
        visit: set.visit[index],
        visit_order: set.visit_order[index]
      };
      return timepoint;
    }

    function data() {
      mutate.call(this);
      this.set = set(this.data);
      this.group = group(this.data);
      this.summary = summarize(this.data, this.set, this.settings);
      this.timepoint = timepoint(this.settings.timepoint, this.set);
    }

    function getDimensions$1(settings) {
      var margin = {
        top: settings.fontSize * 2,
        right: 100,
        bottom: 25,
        left: 50
      };
      var width = 500 - margin.left - margin.right;
      var height = 200 - margin.top - margin.bottom;
      return {
        margin: margin,
        width: width,
        height: height
      };
    }

    function getLayout(key, dimensions) {
      var main = this.util.addElement('container', this.layout.charts);
      var header = this.util.addElement('header', main, 'h3').text(key);
      var width = dimensions.width + dimensions.margin.left + dimensions.margin.right;
      var height = dimensions.height + dimensions.margin.top + dimensions.margin.bottom;
      var margin = dimensions.margin;
      var svg = this.util.addElement('time-series__svg', main, 'svg').attr('width', width).attr('height', height);
      var g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      g.dimensions = dimensions;
      g.width = width;
      g.height = height;
      g.margin = margin;
      return {
        main: main,
        header: header,
        svg: g
      };
    }

    function getXScale(domain, dimensions, svg, visits) {
      var xScale = d3.scalePoint().domain(domain).range([0, dimensions.width]).padding([0.5]);
      var xAxis = svg.append('g').classed('atm-axis', true).attr('transform', 'translate(0,' + dimensions.height + ')').call(d3.axisBottom(xScale));
      xAxis.selectAll('.tick').classed('atm-missing', function (d) {
        return visits.includes(d) === false;
      });
      return xScale;
    }

    function getYScale(domain, dimensions, svg) {
      var yScale = d3.scaleLinear().domain(domain).nice().range([dimensions.height, 0]);
      svg.append('g').classed('atm-axis', true).call(d3.axisLeft(yScale));

      var yGrid = function yGrid(g) {
        return g.attr('class', 'grid-lines').selectAll('line').data(yScale.ticks()).join('line').attr('x1', 0) //dimensions.margin.left)
        .attr('x2', dimensions.width) // - dimensions.margin.right)
        .attr('y1', function (d) {
          return yScale(d);
        }).attr('y2', function (d) {
          return yScale(d);
        });
      };

      svg.append('g').call(yGrid);
      return yScale;
    }

    function getColorScale(domain) {
      var range = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : d3.schemeSet2;
      var colorScale = d3.scaleOrdinal().domain(domain).range(range);
      return colorScale;
    }

    function plotLines(svg, data, scales) {
      var _this = this;

      var lineGenerator = d3.line().x(function (d) {
        return scales.x(d[0]);
      }).y(function (d) {
        return scales.y(d[1].value);
      });
      var lines = svg.selectAll('path.line').data(data).join('path').classed('line', true);
      lines.attr('d', function (d) {
        var currentTimepoint = d[1][_this.settings.timepoint];
        var pathData = d[1].map(function (d, i) {
          return i >= _this.settings.timepoint ? currentTimepoint : d;
        });
        return lineGenerator(pathData);
      }).attr('stroke', function (d) {
        return scales.color(d.color_value);
      }).attr('stroke-width', Math.max(12 / this.set.stratification.length, 1)) //.attr('stroke-opacity', .5)
      .attr('fill', 'none');
      lines.lineGenerator = lineGenerator;
      return lines;
    }

    function plotPoints(svg, data, scales) {
      var _this = this;

      var pointGroups = svg.selectAll('g.point-group').data(data, function (d) {
        return d[0];
      }).join('g').classed('point-group', true);
      pointGroups //.attr('fill-opacity', .75)
      .attr('fill', function (d) {
        return scales.color(d.color_value);
      });
      var points = pointGroups.selectAll('circle.point').data(function (d) {
        return d[1].slice(0, _this.settings.timepoint + 1);
      }, function (d, i) {
        return [d.stratum[0], i].join('|');
      }).join('circle').classed('point', true);
      points.attr('cx', function (d) {
        return scales.x(d[0]);
      }).attr('cy', function (d) {
        return scales.y(d[1].value);
      }).attr('r', 5).attr('stroke', 'white');
      return pointGroups;
    }

    // TODO: reverse algorithm to shift text upward - add top margin as needed
    //
    // reposition annotations to avoid overlap
    function updateSpacing(data) {
      var spacing = this.settings.fontSize;
      data.sort(function (a, b) {
        return b.y - a.y;
      }).forEach(function (d, i) {
        if (i > 0) {
          var diff = data[i - 1].y - d.y;

          if (diff < spacing) {
            d.y = d.y - (spacing - diff);
          }
        }
      });
    }

    function plotAnnotations(svg, data, scales) {
      var _this = this;

      // create elements
      var annotations = svg.selectAll('text.annotation').data(data).join('text').classed('annotation', true); // bind data

      annotations.datum(function (d) {
        var datum = d[1][_this.settings.timepoint];
        return {
          x: scales.x(datum[0]),
          y: scales.y(datum[1].value),
          color: scales.color(d[0]),
          text: d[0],
          stratum: d
        };
      });
      updateSpacing.call(this, annotations.data()); // apply attributes

      annotations.attr('x', function (d) {
        return d.x;
      }).attr('y', function (d) {
        return d.y;
      }).attr('dx', 7).attr('dy', this.settings.fontSize / 3).attr('fill', function (d) {
        return d.color;
      }).style('font-size', this.settings.fontSize).style('font-weight', this.settings.fontWeight).text(function (d) {
        return d.text;
      });
      return annotations;
    }

    function updateLines(lines, scales) {
      var _this = this;

      lines.transition().duration(this.settings.speed).attr('d', function (d) {
        var currentTimepoint = d[1][_this.settings.timepoint];
        var pathData = d[1].map(function (d, i) {
          return i >= _this.settings.timepoint ? currentTimepoint : d;
        });
        return lines.lineGenerator(pathData);
      });
    }

    function updatePoints(points, scales) {
      var _this = this;

      points.selectAll('circle.point').data(function (d) {
        return d[1].slice(0, _this.settings.timepoint + 1);
      }, function (d, i) {
        return [d.stratum[0], i].join('|');
      }).join(function (enter) {
        return enter.append('circle').classed('point', true).attr('r', 5).attr('stroke', 'white').attr('cx', function (d) {
          var datum = d.stratum[1][_this.settings.timepoint - 1];
          return scales.x(datum[0]);
        }).attr('cy', function (d) {
          var datum = d.stratum[1][_this.settings.timepoint - 1];
          return scales.y(datum[1].value);
        }).call(function (enter) {
          return enter.transition().duration(_this.settings.speed).attr('cx', function (d) {
            return scales.x(d[0]);
          }).attr('cy', function (d) {
            return scales.y(d[1].value);
          });
        });
      });
      return points;
    }

    function updateAnnotations(annotations, scales) {
      var _this = this;

      annotations.datum(function (d) {
        var datum = d.stratum[1][_this.settings.timepoint];
        return {
          x: scales.x(datum[0]),
          y: scales.y(datum[1].value),
          color: scales.color(d[0]),
          text: d[0],
          stratum: d.stratum
        };
      });
      updateSpacing.call(this, annotations.data());
      annotations.transition().duration(this.settings.speed).attr('x', function (d) {
        return d.x;
      }).attr('y', function (d) {
        return d.y;
      });
    }

    function plot() {
      var _this = this;

      //this.summary.forEach((stratum) => {
      //    stratum.subset = stratum[1].slice(0, this.settings.timepoint + 1);
      //});
      var dimensions = getDimensions$1(this.settings); // Iterate through measures.

      var _iterator = _createForOfIteratorHelper(this.summary),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var measure = _step.value;
          var data = measure[1]; // layout

          var layout = getLayout.call(this, measure[0], dimensions); // scales

          var scales = {
            x: getXScale(this.set.visit, dimensions, layout.svg, measure.visits),
            y: getYScale([d3.min(measure.tabular, function (d) {
              return d.value;
            }), d3.max(measure.tabular, function (d) {
              return d.value;
            })], dimensions, layout.svg),
            color: getColorScale(this.set.color)
          };
          measure.scales = scales; // graphical objects

          measure.lines = plotLines.call(this, layout.svg, data, scales);
          measure.points = plotPoints.call(this, layout.svg, data, scales);
          if (this.settings.annotate) measure.annotations = plotAnnotations.call(this, layout.svg, data, scales);
        } // increment timepoint and update plot accordingly

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var iterate = function iterate() {
        this.settings.timepoint++;

        if (this.settings.timepoint >= this.set.visit.length) {
          this.interval.stop();
          this.settings.timepoint = 0;
        } else {
          this.timepoint = timepoint(this.settings.timepoint, this.set);

          var _iterator2 = _createForOfIteratorHelper(this.summary),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var measure = _step2.value;
              updateLines.call(this, measure.lines, measure.scales);
              updatePoints.call(this, measure.points, measure.scales);
              if (this.settings.annotate) updateAnnotations.call(this, measure.annotations, measure.scales);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      }; // initialize time interval


      this.interval = d3.interval(function () {
        iterate.call(_this);
      }, this.settings.speed);
    }

    function animatedTimeSeries(_data_) {
      var _element_ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'body';

      var _settings_ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var main = {
        data: _data_,
        element: _element_,
        settings: settings().update(Object.assign(settings(), _settings_)),
        util: util
      };
      main.layout = layout.call(main); // add elements to DOM

      data.call(main); // mutate and structure data

      plot.call(main); // define and render plots

      return main;
    }

    return animatedTimeSeries;

})));
