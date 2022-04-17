(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory())
        : typeof define === 'function' && define.amd
        ? define(factory)
        : ((global = typeof globalThis !== 'undefined' ? globalThis : global || self),
          (global.animatedTimeSeries = factory()));
})(this, function () {
    'use strict';

    function addElement(name, parent) {
        var tagName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'div';
        var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        var id =
            arguments.length > 4 && arguments[4] !== undefined
                ? arguments[4]
                : function (d, i) {
                      return i;
                  };
        return data
            ? parent
                  .selectAll(''.concat(tagName, '.atm-').concat(name, '.atm-').concat(tagName))
                  .data(data, id)
                  .join(tagName)
                  .classed('atm-'.concat(name, ' atm-').concat(tagName), true) // multiple elements
            : parent.append(tagName).classed('atm-'.concat(name, ' atm-').concat(tagName), true); // single element
    }

    var util = {
        addElement: addElement,
    };

    function update(settings) {
        // TODO: support non-stratified outputs.
        // Set stratification variable to whatever.
        //if (settings.stratification_var === null)
        //    settings.stratificaton_var = '?';//settings.stratification_var;
        // Set color variable to stratification variable if null.
        if (settings.color_var === null) settings.color_var = settings.stratification_var; //

        if (settings.var_labels.stratification === null)
            settings.var_labels.stratification = settings.stratification_var;
        if (!['ordinal', 'discrete'].includes(settings.xType)) settings.xType = 'ordinal';
        if (settings.xType === 'ordinal') settings.xVar = 'visit';
        else if (settings.xType === 'discrete') settings.xVar = 'timepoint';

        if (settings.stratification_var !== settings.color_var) {
            settings.annotate = false;
            settings.displayLegend = true;
        } // Update footnotes.

        settings.footnotes = settings.footnotes.map(function (text) {
            return text
                .replace('[aggregate]', settings.aggregate)
                .replace('[outcome]', settings.outcome);
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
                result: 'Result',
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
            offset: 7.5,
            displayLegend: false,
            annotate: true,
            pointRadius: 5,
            strokeWidth: 3,
            fontSize: 15,
            fontWeight: 'bold',
            // animation
            play: true,
            timepoint: 0,
            measureIndex: 0,
            speed: 1000,
            pause: 5000,
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
                left: 75,
            },
            // miscellaneous
            footnotes: [
                //`<sup>1</sup> Displaying [aggregate] [outcome].`,
            ],
        };
    }

    function getDimensions(container, settings) {
        var width = container.node().clientWidth / settings.widthFactor;
        var height = width / settings.heightFactor;
        return {
            width: width,
            height: height,
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
            heightAdj: height - this.settings.margin.top - this.settings.margin.bottom,
        }; //window.addEventListener('resize', resize.bind(this));

        return {
            main: main,
            //...controls,
            charts: charts$1,
        };
    }

    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true,
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
            if (enumerableOnly)
                symbols = symbols.filter(function (sym) {
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
                    Object.defineProperty(
                        target,
                        key,
                        Object.getOwnPropertyDescriptor(source, key)
                    );
                });
            }
        }

        return target;
    }

    function _toConsumableArray(arr) {
        return (
            _arrayWithoutHoles(arr) ||
            _iterableToArray(arr) ||
            _unsupportedIterableToArray(arr) ||
            _nonIterableSpread()
        );
    }

    function _arrayWithoutHoles(arr) {
        if (Array.isArray(arr)) return _arrayLikeToArray(arr);
    }

    function _iterableToArray(iter) {
        if (typeof Symbol !== 'undefined' && Symbol.iterator in Object(iter))
            return Array.from(iter);
    }

    function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === 'string') return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === 'Object' && o.constructor) n = o.constructor.name;
        if (n === 'Map' || n === 'Set') return Array.from(o);
        if (n === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
            return _arrayLikeToArray(o, minLen);
    }

    function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;

        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

        return arr2;
    }

    function _nonIterableSpread() {
        throw new TypeError(
            'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        );
    }

    function mutate(data, settings) {
        var nRows = data.length;
        var cleansed = data
            .map(function (d) {
                var datum = _objectSpread2({}, d); // Rename data variables.

                Object.keys(settings)
                    .filter(function (setting) {
                        return /_var$/.test(setting);
                    })
                    .forEach(function (setting) {
                        datum[setting.replace(/_var$/, '')] = [
                            'visit_order_var',
                            'day_var',
                            'result_var',
                            'baseline_var',
                            'change_var',
                            'percent_change_var',
                        ].includes(setting)
                            ? parseFloat(d[settings[setting]])
                            : datum[settings[setting]];
                    });
                return datum;
            })
            .filter(function (d) {
                return !isNaN(d.result);
            });
        var nRowsCleansed = cleansed.length;
        var nRowsRemoved = nRows - nRowsCleansed;
        if (nRowsRemoved > 0)
            console.warn(''.concat(nRowsRemoved, ' rows without results removed.'));
        return cleansed;
    }

    function create(variable, data) {
        var set, array;

        switch (variable) {
            case 'visit':
                set = new Set(
                    data
                        .filter(function (d) {
                            return !(d.visit_order % 1);
                        })
                        .map(function (d) {
                            return d.visit + '|' + d.visit_order;
                        })
                );
                array = _toConsumableArray(set.values())
                    .sort(function (a, b) {
                        return a.replace(/.*\|/, '') - b.replace(/.*\|/, '');
                    })
                    .map(function (value) {
                        return value.replace(/\|.*$/, '');
                    });
                break;

            default:
                set = new Set(
                    data.map(function (d) {
                        return d[variable];
                    })
                );
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
            return d3.median(
                data.filter(function (d) {
                    return d.visit === visit;
                }),
                function (d) {
                    return d.day;
                }
            );
        }); // Calculate horizontal offsets of strata.

        set.offsets = d3.range(
            Math.ceil(-set.stratification.length / 2) * settings.offset +
                (settings.offset / 2) * !(set.stratification.length % 2),
            Math.ceil(set.stratification.length / 2) * settings.offset +
                (settings.offset / 2) * !(set.stratification.length % 2),
            settings.offset
        );
        return set;
    }

    function summarize(group, settings) {
        var results = group
            .map(function (d) {
                return d.result;
            })
            .sort(function (a, b) {
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
        var geomean_ci = jStat
            .tci(
                Math.log(geomean),
                settings.alpha,
                results.map(function (result) {
                    return Math.log(result);
                })
            )
            .map(function (bound) {
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
            geomean_ci: geomean_ci,
        };
        return {
            data: group,
            stats: stats,
            value: stats[settings.aggregate],
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
                    stratumDatum = [
                        stratum,
                        set.visit.map(function (visit) {
                            return [
                                visit,
                                {
                                    data: [],
                                    value: null,
                                },
                            ];
                        }),
                    ];
                    measure[1].splice(i, 0, stratumDatum);
                } // Sort visit-level summary.

                if (stratumDatum)
                    stratumDatum[1].sort(function (a, b) {
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
                        value: visitDatum[0] === visit ? visitDatum[1].value : null,
                    };
                    tabular[i * set.visit.length + j] = datum;
                });
            });
            measure.tabular = tabular.filter(function (d) {
                return true;
            }); // remove empty elements

            measure.visits = _toConsumableArray(
                new Set(
                    measure.tabular.map(function (d) {
                        return d.visit;
                    })
                ).values()
            );
        });
        return imputed;
    }

    function nest(data, set, settings) {
        // Nest data by measure, stratification, and visit and average results.
        var nested = d3.rollups(
            data,
            function (group) {
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
        console.log(this.data.set.measure);
        this.data.nested = nest.call(this, this.data.cleansed, this.data.set, this.settings);
        console.log(this.data.nested);
    }

    function getTimepoint(index, set) {
        var timepoint = {
            index: index,
            visit: set.visit[index],
            visit_order: set.visit_order[index],
            timepoint: set.timepoint[index],
        };
        return timepoint;
    }

    function y(data, range, settings) {
        var values = data.tabular.map(function (d) {
            return d.value;
        });

        if (settings.displayCIs) {
            data[1]
                .map(function (d) {
                    return d[1];
                })
                .flat()
                .map(function (d) {
                    return d[1].stats[''.concat(settings.aggregate, '_ci')];
                })
                .flat()
                .forEach(function (ci) {
                    return values.push(ci);
                });
        }

        var yScale = d3
            .scaleLinear()
            .domain([d3.min(values), d3.max(values)])
            .nice()
            .range(range);
        return yScale;
    }

    function getMeasure(data, scales, settings) {
        var measure = {
            index: settings.measureIndex,
            data: data[settings.measureIndex],
            scales: scales,
        };
        measure.scales.y = y(measure.data, [settings.dimensions.heightAdj, 0], settings);
        return measure;
    }

    function x(domain, range, type) {
        var xScale;

        if (type === 'ordinal') {
            xScale = d3.scalePoint().domain(domain).range(range).padding([0.5]);
        } else {
            var extent = d3.extent(domain);
            var extentDiff = extent[1] - extent[0];
            xScale = d3
                .scaleLinear()
                .domain([extent[0] - extentDiff * 0.05, extent[1] + extentDiff * 0.05]) //.nice()
                .range(range);
        }

        return xScale;
    }

    function color(domain, range) {
        var colorScale = d3.scaleOrdinal().domain(domain).range(range);
        return colorScale;
    }

    var scales = {
        x: x,
        y: y,
        color: color,
    };

    function canvas(key, dimensions) {
        var main = this.layout.charts //.insert('div', ':first-child')
            .append('div')
            .classed('atm-container atm-div', true);
        var header = this.util.addElement('header', main, 'h3').text(key).style('display', 'none');
        var svg = this.util
            .addElement('time-series__svg', main, 'svg')
            .attr('width', dimensions.width)
            .attr('height', dimensions.height)
            .style('display', 'none');
        var canvas = this.util
            .addElement('time-series__g', svg, 'g')
            .attr(
                'transform',
                'translate(' + dimensions.margin.left + ',' + dimensions.margin.top + ')'
            )
            .style('display', 'none');

        var transitionEnd = function transitionEnd() {
            header.style('display', null);
            svg.style('display', null);
            canvas.style('display', null);
        };

        var mainTransition = main
            .style('width', '0%')
            .transition()
            .duration(this.settings.speed)
            .style('width', '50%'); //.on('end', transitionEnd);

        return {
            canvas: canvas,
            mainTransition: mainTransition,
            transitionEnd: transitionEnd,
        };
    }

    function xAxis(canvas, xScale, dimensions, type, set) {
        var xAxis = canvas
            .append('g')
            .classed('atm-axis', true)
            .attr('transform', 'translate(0,' + dimensions.heightAdj + ')');

        if (type === 'ordinal') {
            xAxis.call(d3.axisBottom(xScale));
        } else {
            xAxis.call(
                d3
                    .axisBottom(xScale)
                    .tickValues(set.timepoint)
                    .tickFormat(function (d, i) {
                        return set.visit[i];
                    })
            );
        }

        xAxis
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('transform', 'rotate(-45)')
            .attr('dx', '-.8em')
            .attr('dy', '.15em'); // TODO: make this work with a discrete time scale
        //if (visits !== null)
        //    xAxis
        //        .selectAll('.tick')
        //        .classed(
        //            'atm-missing',
        //            (d) => {
        //                visits.includes(d) === false
        //            });

        return xAxis;
    }

    function yAxis(canvas, yScale, dimensions) {
        var yAxis = canvas.append('g').classed('atm-axis', true).call(d3.axisLeft(yScale));
        yAxis.grid = canvas.append('g').call(function (g) {
            g.attr('class', 'grid-lines')
                .selectAll('line')
                .data(yScale.ticks())
                .join('line')
                .attr('x1', 0)
                .attr('x2', dimensions.widthAdj)
                .attr('y1', function (d) {
                    return yScale(d);
                })
                .attr('y2', function (d) {
                    return yScale(d);
                });
            g.append('text')
                .attr('class', 'axis-label')
                .attr('transform', 'rotate(-90)')
                .attr('text-anchor', 'middle') //.attr('alignment-baseline', 'middle')
                .attr('font-size', 16)
                .attr('x', -dimensions.heightAdj / 2)
                .attr('y', -(dimensions.margin.left - 32))
                .text('Result');
        });
        return yAxis;
    }

    function layout$1(measure) {
        var dimensions = this.settings.dimensions;

        var _addCanvas$call = canvas.call(this, measure.data[0], dimensions),
            canvas$1 = _addCanvas$call.canvas,
            mainTransition = _addCanvas$call.mainTransition,
            transitionEnd = _addCanvas$call.transitionEnd;

        var xAxis$1 = xAxis(
            canvas$1,
            measure.scales.x,
            dimensions,
            this.settings.xType,
            this.data.set,
            measure.visits
        );
        var yAxis$1 = yAxis(canvas$1, measure.scales.y, dimensions); //const legend = addLegend(
        //    canvas,
        //    measure.scales.color,
        //    dimensions,
        //    this.settings
        //);

        return {
            canvas: canvas$1,
            mainTransition: mainTransition,
            transitionEnd: transitionEnd,
            xAxis: xAxis$1,
            yAxis: yAxis$1,
        };
    }

    function plotLines(svg, data, scales) {
        var _this = this;

        var lineGenerator = d3
            .line()
            .x(function (d) {
                return scales.x(d[_this.settings.xVar]) + d.stratum.offset;
            })
            .y(function (d) {
                return scales.y(d[1].value);
            });
        var lines = svg.selectAll('path.line').data(data).join('path').classed('line', true);
        lines
            .attr('d', function (d) {
                var currentTimepoint = d[1][_this.settings.timepoint];
                var pathData = d[1].map(function (d, i) {
                    return i >= _this.settings.timepoint ? currentTimepoint : d;
                });
                return lineGenerator(pathData);
            })
            .attr('stroke', function (d) {
                return scales.color(d.color_value);
            })
            .attr('stroke-width', this.settings.strokeWidth)
            .attr('stroke-opacity', 0.75)
            .attr('fill', 'none');
        lines.lineGenerator = lineGenerator;
        return lines;
    }

    function plotPoints(svg, data, scales) {
        var _this = this;

        var pointGroups = svg
            .selectAll('g.point-group')
            .data(data, function (d) {
                return d[0];
            })
            .join('g')
            .classed('point-group', true);
        pointGroups //.attr('fill-opacity', .75)
            .attr('fill', function (d) {
                return scales.color(d.color_value);
            });
        var points = pointGroups
            .selectAll('circle.point')
            .data(
                function (d) {
                    return d[1].slice(0, _this.settings.timepoint + 1);
                },
                function (d, i) {
                    return [d.stratum[0], i].join('|');
                }
            )
            .join('circle')
            .classed('point', true);
        points
            .attr('cx', function (d) {
                return scales.x(d[_this.settings.xVar]) + d.stratum.offset;
            })
            .attr('cy', function (d) {
                return scales.y(d[1].value);
            })
            .attr('stroke', 'white')
            .attr('r', 0)
            .transition()
            .duration(this.settings.speed / 2)
            .attr('r', this.settings.pointRadius);
        return pointGroups;
    }

    function plotCIs(svg, data, scales) {
        var _this = this;

        var ciGroups = svg
            .selectAll('g.ci-group')
            .data(data, function (d) {
                return d[0];
            })
            .join('g')
            .classed('ci-group', true);
        ciGroups //.attr('fill-opacity', .75)
            .attr('stroke', function (d) {
                return scales.color(d.color_value);
            })
            .attr('stroke-width', this.settings.strokeWidth);
        var CIs = ciGroups
            .selectAll('line.ci')
            .data(
                function (d) {
                    return d[1].slice(0, _this.settings.timepoint + 1);
                },
                function (d, i) {
                    return [d.stratum[0], i].join('|');
                }
            )
            .join('line')
            .classed('ci', true);
        CIs.attr('x1', function (d) {
            return scales.x(d[_this.settings.xVar]) + d.stratum.offset;
        })
            .attr('x2', function (d) {
                return scales.x(d[_this.settings.xVar]) + d.stratum.offset;
            })
            .attr('y1', function (d) {
                return scales.y(d[1].value);
            })
            .attr('y2', function (d) {
                return scales.y(d[1].value);
            })
            .attr('stroke-linecap', 'round')
            .transition()
            .duration(this.settings.speed / 4)
            .delay(this.settings.speed / 2)
            .attr('y1', function (d) {
                return scales.y(d[1].stats[''.concat(_this.settings.aggregate, '_ci')][0]);
            })
            .attr('y2', function (d) {
                return scales.y(d[1].stats[''.concat(_this.settings.aggregate, '_ci')][1]);
            });
        return ciGroups;
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
        var annotations = svg
            .selectAll('text.annotation')
            .data(data)
            .join('text')
            .classed('annotation', true); // bind data

        annotations.datum(function (d) {
            // Get visit datum.
            var datum = d[1][_this.settings.timepoint];
            return {
                x: scales.x(datum[_this.settings.xVar]),
                y: scales.y(datum[1].value),
                color: scales.color(d[0]),
                text: d[0],
                stratum: d,
            };
        });
        updateSpacing.call(this, annotations.data()); // apply attributes

        annotations
            .attr('x', function (d) {
                return d.x;
            })
            .attr('y', function (d) {
                return d.y;
            })
            .attr('dx', this.settings.offset * 2)
            .attr('dy', this.settings.fontSize / 3)
            .attr('fill', function (d) {
                return d.color;
            })
            .style('font-weight', this.settings.fontWeight)
            .text(function (d) {
                return d.text;
            })
            .attr('font-size', 0);
        annotations
            .transition()
            .duration(this.settings.speed / this.data.set.stratification.length)
            .delay(function (d, i) {
                return (i * _this.settings.speed) / _this.data.set.stratification.length;
            })
            .attr('font-size', this.settings.fontSize);
        return annotations;
    }

    function plot(measure) {
        var data = measure.data[1];
        measure.lines = plotLines.call(this, measure.layout.canvas, data, measure.scales);
        measure.points = plotPoints.call(this, measure.layout.canvas, data, measure.scales);
        if (this.settings.displayCIs)
            measure.CIs = plotCIs.call(this, measure.layout.canvas, data, measure.scales);
        if (this.settings.annotate)
            measure.annotations = plotAnnotations.call(
                this,
                measure.layout.canvas,
                data,
                measure.scales
            );
        if (this.settings.displayLegend)
            measure.legend = addLegend.call(
                this,
                measure.layout.canvas,
                measure.scales.color,
                dimensions
            );
    }

    function updateLines(lines, scales) {
        var _this = this;

        lines
            .transition()
            .duration(this.settings.speed - 0.25 * this.settings.speed * this.settings.displayCIs)
            .attr('d', function (d) {
                var currentTimepoint = d[1][_this.settings.timepoint];
                var pathData = d[1].map(function (d, i) {
                    return i >= _this.settings.timepoint ? currentTimepoint : d;
                });
                return lines.lineGenerator(pathData);
            });
    }

    function updatePoints(points, scales) {
        var _this = this;

        points
            .selectAll('circle.point')
            .data(
                function (d) {
                    return d[1].slice(0, _this.settings.timepoint + 1);
                },
                function (d, i) {
                    return [d.stratum[0], i].join('|');
                }
            )
            .join(function (enter) {
                return enter
                    .append('circle')
                    .classed('point', true)
                    .attr('r', _this.settings.pointRadius)
                    .attr('stroke', 'white')
                    .attr('cx', function (d) {
                        var datum = d.stratum[1][_this.settings.timepoint - 1];
                        return scales.x(datum[_this.settings.xVar]) + datum.stratum.offset;
                    })
                    .attr('cy', function (d) {
                        var datum = d.stratum[1][_this.settings.timepoint - 1];
                        return scales.y(datum[1].value);
                    })
                    .call(function (enter) {
                        return enter
                            .transition()
                            .duration(
                                _this.settings.speed -
                                    0.25 * _this.settings.speed * _this.settings.displayCIs
                            )
                            .attr('cx', function (d) {
                                return scales.x(d[_this.settings.xVar]) + d.stratum.offset;
                            })
                            .attr('cy', function (d) {
                                return scales.y(d[1].value);
                            });
                    });
            });
        return points;
    }

    function updateCIs(CIs, scales) {
        var _this = this;

        CIs.selectAll('line.ci')
            .data(
                function (d) {
                    return d[1].slice(0, _this.settings.timepoint + 1);
                },
                function (d, i) {
                    return [d.stratum[0], i].join('|');
                }
            )
            .join(function (enter) {
                return enter
                    .append('line')
                    .classed('ci', true)
                    .attr('x1', function (d) {
                        return scales.x(d[_this.settings.xVar]) + d.stratum.offset;
                    })
                    .attr('x2', function (d) {
                        return scales.x(d[_this.settings.xVar]) + d.stratum.offset;
                    })
                    .attr('y1', function (d) {
                        return scales.y(d[1].value);
                    })
                    .attr('y2', function (d) {
                        return scales.y(d[1].value);
                    })
                    .call(function (enter) {
                        return enter
                            .transition()
                            .duration(0.25 * _this.settings.speed)
                            .delay(0.75 * _this.settings.speed)
                            .attr('y1', function (d) {
                                return scales.y(
                                    d[1].stats[''.concat(_this.settings.aggregate, '_ci')][0]
                                );
                            })
                            .attr('y2', function (d) {
                                return scales.y(
                                    d[1].stats[''.concat(_this.settings.aggregate, '_ci')][1]
                                );
                            })
                            .attr('stroke-linecap', 'round');
                    });
            });
        return CIs;
    }

    function updateAnnotations(annotations, scales) {
        var _this = this;

        annotations.datum(function (d) {
            var datum = d.stratum[1][_this.settings.timepoint];
            return {
                x: scales.x(datum[_this.settings.xVar]),
                y: scales.y(datum[1].value),
                color: scales.color(d[0]),
                text: d[0],
                stratum: d.stratum,
            };
        });
        updateSpacing.call(this, annotations.data());
        annotations
            .transition()
            .duration(this.settings.speed - 0.25 * this.settings.speed * this.settings.displayCIs)
            .attr('x', function (d) {
                return d.x;
            })
            .attr('y', function (d) {
                return d.y;
            });
    }

    function update$1(measure) {
        var _this = this;

        this.settings.timepoint++;

        if (this.settings.timepoint >= this.data.set.visit.length) {
            this.interval.stop();
            this.settings.measureIndex++;
            d3.timeout(function () {
                _this.settings.timepoint = 0;
                _this.timepoint = getTimepoint(_this.settings.timepoint, _this.data.set);

                if (_this.settings.measureIndex < _this.data.set.measure.length) {
                    _this.measure = getMeasure(_this.data.nested, _this.scales, _this.settings);
                    _this.measure.layout = layout$1.call(_this, _this.measure);

                    _this.measure.layout.mainTransition.on('end', function () {
                        _this.measure.layout.transitionEnd();

                        plot.call(_this, _this.measure);
                        d3.timeout(function () {
                            // initialize time interval
                            _this.interval = d3.interval(function () {
                                update$1.call(_this, _this.measure);
                            }, _this.settings.speed);
                        }, _this.settings.speed * 2);
                    });
                }
            }, this.settings.pause);
        } else {
            this.timepoint = getTimepoint(this.settings.timepoint, this.data.set);
            updateLines.call(this, measure.lines, measure.scales);
            updatePoints.call(this, measure.points, measure.scales);
            if (this.settings.displayCIs) updateCIs.call(this, measure.CIs, measure.scales);
            if (this.settings.annotate)
                updateAnnotations.call(this, measure.annotations, measure.scales);
        }
    }

    function init() {
        var _this = this;

        this.timepoint = getTimepoint(this.settings.timepoint, this.data.set); // common scales (x, color)

        this.scales = {
            x: scales.x(
                this.data.set[this.settings.xVar],
                [0, this.settings.dimensions.widthAdj],
                this.settings.xType
            ),
            color: scales.color(this.data.set.color, this.settings.colorScheme),
        };
        this.measure = getMeasure(this.data.nested, this.scales, this.settings);
        this.measure.layout = layout$1.call(this, this.measure);
        this.measure.layout.mainTransition.on('end', function () {
            _this.measure.layout.transitionEnd();

            plot.call(_this, _this.measure);
            d3.timeout(function () {
                // initialize time interval
                _this.interval = d3.interval(function () {
                    update$1.call(_this, _this.measure);
                }, _this.settings.speed);
            }, _this.settings.speed * 2);
        });
    }

    function animatedTimeSeries(_data_) {
        var _element_ = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'body';

        var _settings_ = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var main = {
            data: {
                raw: _data_,
            },
            element: _element_,
            settings: settings().update(Object.assign(settings(), _settings_)),
            util: util,
        };
        main.layout = layout.call(main); // add elements to DOM

        data.call(main); // mutate and structure data

        init.call(main); // define and render plots

        return main;
    }

    return animatedTimeSeries;
});
