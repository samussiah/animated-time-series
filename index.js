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

    var util = {
      addElement: addElement
    };

    function update(settings) {
      // TODO: support non-stratified outputs.
      // Set stratification variable to whatever.
      //if (settings.stratification_var === null)
      //    settings.stratificaton_var = '?';//settings.stratification_var;
      // Set color variable to stratification variable if null.
      if (settings.color_var === null) settings.color_var = settings.stratification_var; //

      if (settings.var_labels.stratification === null) settings.var_labels.stratification = settings.stratification_var;
      if (!['ordinal', 'discrete'].includes(settings.xType)) settings.xType = 'ordinal';
      if (settings.xType === 'ordinal') settings.xVar = 'visit';else if (settings.xType === 'discrete') settings.xVar = 'timepoint';

      if (settings.stratification_var !== settings.color_var) {
        settings.annotate = false;
        settings.displayLegend = true;
      } // Update footnotes.


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
          day: 'Study Day',
          measure: 'Measure',
          result: 'Result'
        },
        // statistics
        aggregate: 'mean',
        displayCIs: true,
        alpha: 0.05,
        // x stuff
        xType: 'ordinal',
        // [ 'ordinal' , 'discrete' ]
        xVar: 'visit',
        // [ 'visit', 'timepoint' ]
        // y stuff
        // color stuff
        colorScheme: d3.schemeSet2,
        offset: 10,
        displayLegend: false,
        annotate: true,
        pointRadius: 5,
        strokeWidth: 5,
        fontSize: 15,
        fontWeight: 'bold',
        // animation
        play: true,
        timepoint: 0,
        measureIndex: 0,
        speed: 1000,
        pause: 1000,
        // dimensions
        width: null,
        // defined in ./layout/getDimensions
        widthFactor: 2,
        height: null,
        // defined in ./layout/getDimensions
        heightFactor: 2,
        margin: {
          top: 50,
          right: 100,
          bottom: 100,
          left: 50
        },
        // miscellaneous
        footnotes: [//`<sup>1</sup> Displaying [aggregate] [outcome].`,
        ]
      };
    }

    function getDimensions(container, settings) {
      var width = container.node().clientWidth / settings.widthFactor;
      var height = width / settings.heightFactor;
      return {
        width: width,
        height: height
      };
    }

    function charts(main) {
      var charts = this.util.addElement('charts', main);
      return charts;
    }

    function layout() {
      var main = this.util.addElement('main', d3.select(this.element)); //const controls = layoutControls.call(this, main); //this.util.addElement('controls', main);

      var charts$1 = charts.call(this, main);

      var _getDimensions = getDimensions(charts$1, this.settings),
          width = _getDimensions.width,
          height = _getDimensions.height; // determine widths of DOM elements based on width of main container


      this.settings.width = width;
      this.settings.height = height;
      this.settings.dimensions = {
        width: width,
        height: height,
        margin: this.settings.margin,
        widthAdj: width - this.settings.margin.left - this.settings.margin.right,
        heightAdj: height - this.settings.margin.top - this.settings.margin.bottom
      }; //window.addEventListener('resize', resize.bind(this));

      return {
        main: main,
        //...controls,
        charts: charts$1
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

    function mutate(data, settings) {
      var nRows = data.length;
      var cleansed = data.map(function (d) {
        var datum = _objectSpread2({}, d); // Rename data variables.


        Object.keys(settings).filter(function (setting) {
          return /_var$/.test(setting);
        }).forEach(function (setting) {
          datum[setting.replace(/_var$/, '')] = ['visit_order_var', 'day_var', 'result_var', 'baseline_var', 'change_var', 'percent_change_var'].includes(setting) ? parseFloat(d[settings[setting]]) : datum[settings[setting]];
        });
        return datum;
      }).filter(function (d) {
        return !isNaN(d.result);
      });
      var nRowsCleansed = cleansed.length;
      var nRowsRemoved = nRows - nRowsCleansed;
      if (nRowsRemoved > 0) console.warn("".concat(nRowsRemoved, " rows without results removed."));
      return cleansed;
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

    function set(data, settings) {
      var set = {};
      set.stratification = create('stratification', data);
      set.color = create('color', data);
      set.id = create('id', data);
      set.visit = create('visit', data);
      set.visit_order = create('visit_order', data);
      set.day = create('day', data);
      set.measure = create('measure', data); // Calculate median continuous timepoint of each ordinal timepoint.

      set.timepoint = set.visit.map(function (visit) {
        return d3.median(data.filter(function (d) {
          return d.visit === visit;
        }), function (d) {
          return d.day;
        });
      }); // Calculate horizontal offsets of strata.

      set.offsets = d3.range(Math.ceil(-set.stratification.length / 2) * settings.offset + settings.offset / 2 * !(set.stratification.length % 2), Math.ceil(set.stratification.length / 2) * settings.offset + settings.offset / 2 * !(set.stratification.length % 2), settings.offset);
      return set;
    }

    function summarize(group, settings) {
      var results = group.map(function (d) {
        return d.result;
      }).sort(function (a, b) {
        return a - b;
      });
      var jObj = jStat(results);
      var n = group.length;
      var mean = d3.mean(results);
      var deviation = d3.deviation(results);
      var mean_ci = jStat.tci(mean, settings.alpha, results);
      var min = d3.min(results);
      var median = d3.median(results);
      var max = d3.max(results);
      var geomean = jStat.geomean(results);
      var geomean_ci = jStat.tci(Math.log(geomean), settings.alpha, results.map(function (result) {
        return Math.log(result);
      })).map(function (bound) {
        return Math.exp(bound);
      });
      var stats = {
        n: n,
        mean: mean,
        deviation: deviation,
        mean_ci: mean_ci,
        min: min,
        median: median,
        max: max,
        geomean: geomean,
        geomean_ci: geomean_ci
      };
      return {
        data: group,
        stats: stats,
        value: stats[settings.aggregate]
      };
    }

    function impute(nested, set, settings) {
      var imputed = structuredClone(nested); // Iterate over measures to generate tabular summary.

      imputed.forEach(function (measure, i) {
        // Create array with as many elements as stratification and visit values combined.
        var tabular = Array(set.stratification.length * set.visit.length); // TODO: handle missing strata for given measure
        // Iterate over strata within measure.

        set.stratification.forEach(function (stratum, i) {
          var stratumDatum = measure[1].find(function (d) {
            return d[0] === stratum;
          }); // Handle missing data.

          if (stratumDatum === undefined) {
            stratumDatum = [stratum, set.visit.map(function (visit) {
              return [visit, {
                data: [],
                value: null
              }];
            })];
            measure[1].splice(i, 0, stratumDatum);
          } // Sort visit-level summary.


          if (stratumDatum) stratumDatum[1].sort(function (a, b) {
            return set.visit.indexOf(a[0]) - set.visit.indexOf(b[0]);
          });
          stratumDatum.color_value = stratumDatum[1][0][1].data[0][settings.color_var];
          stratumDatum.offset = set.offsets[i]; // Iterate over visits within strata.

          set.visit.forEach(function (visit, j) {
            // Return data for given measure / stratum / visit.
            var visitDatum = stratumDatum[1].find(function (d) {
              return d[0] === visit;
            }); // TODO: what if measure is not captured at first visit?  Use next visit?
            // Handle missing data. If measure is not captured at given visit, use previous visit.

            if (visitDatum === undefined) {
              visitDatum = _toConsumableArray(stratumDatum[1][j - 1]);
              stratumDatum[1].splice(j, 0, visitDatum);
            }

            visitDatum.visit = visitDatum[0];
            visitDatum.index = set.visit.findIndex(function (visit) {
              return visit === visitDatum[0];
            });
            visitDatum.visit_order = set.visit_order[visitDatum.index];
            visitDatum.timepoint = set.timepoint[visitDatum.index]; // TODO: add day?
            // Attach stratum-level data to visit.

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
      return imputed;
    }

    function nest(data, set, settings) {
      // Nest data by measure, stratification, and visit and average results.
      var nested = d3.rollups(data, function (group) {
        return summarize(group, settings);
      }, // calculate statistics
      function (d) {
        return d.measure;
      }, // nest by outcome (panel)
      function (d) {
        return d.stratification;
      }, // nest by stratum (stratification)
      function (d) {
        return d.visit;
      } // nest by timepoint (x-axis value)
      ); // Identify and generate missing combinations of outcome / stratum / timepoint.

      var imputed = impute(nested, set, settings);
      return imputed;
    }

    function data() {
      this.data.cleansed = mutate.call(this, this.data.raw, this.settings);
      this.data.set = set.call(this, this.data.cleansed, this.settings);
      this.data.nested = nest.call(this, this.data.cleansed, this.data.set, this.settings);
    }

    function getTimepoint(index, set) {
      var timepoint = {
        index: index,
        visit: set.visit[index],
        visit_order: set.visit_order[index],
        timepoint: set.timepoint[index]
      };
      return timepoint;
    }

    function getMeasure(index, data, scales, dimensions) {
      var measure = {
        index: index,
        data: data[index],
        scales: scales.map(function (scale) {
          return scale.copy();
        })
      };
      console.log(measure);
      measure.scales.y = scales.y(measure.data, [dimensions.heightAdj, 0]);
      return measure;
    }

    function x(domain, range, type) {
      var xScale;

      if (type === 'ordinal') {
        xScale = d3.scalePoint().domain(domain).range(range).padding([0.5]);
      } else {
        var extent = d3.extent(domain);

        var _range = extent[1] - extent[0];

        xScale = d3.scaleLinear().domain([extent[0] - _range * 0.05, extent[1] + _range * 0.05]) //.nice()
        .range(_range);
      }

      return xScale;
    }

    function y(data, range) {
      var _this = this;

      console.log(data);
      var values = data.tabular.map(function (d) {
        return d.value;
      });

      if (this.settings.displayCIs) {
        data.map(function (d) {
          return d[1];
        }).flat().map(function (d) {
          return d[1].stats["".concat(_this.settings.aggregate, "_ci")];
        }).flat().forEach(function (ci) {
          return values.push(ci);
        });
      }

      var yScale = d3.scaleLinear().domain([d3.min(values), d3.max(values)]).nice().range(range);
      return yScale;
    }

    function color(domain, range) {
      var colorScale = d3.scaleOrdinal().domain(domain).range(range);
      return colorScale;
    }

    var scales = {
      x: x,
      y: y,
      color: color
    };

    function init() {

      this.timepoint = getTimepoint(this.settings.timepoint, this.data.set); // common scales (x, color)

      this.scales = {
        x: scales.x(this.data.set[this.settings.xVar], [0, this.settings.dimensions.widthAdj], this.settings.xType),
        color: scales.color(this.data.set.color, this.settings.colorScheme)
      }; // TODO: handle y-scale in getMeasure()

      this.measure = getMeasure(this.settings.measureIndex, this.data.nested, this.scales, this.settings.dimensions);
      throw '';
    }

    function animatedTimeSeries(_data_) {
      var _element_ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'body';

      var _settings_ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      var main = {
        data: {
          raw: _data_
        },
        element: _element_,
        settings: settings().update(Object.assign(settings(), _settings_)),
        util: util
      };
      main.layout = layout.call(main); // add elements to DOM

      data.call(main); // mutate and structure data

      init.call(main); // define and render plots

      return main;
    }

    return animatedTimeSeries;

})));
