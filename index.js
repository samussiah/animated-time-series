(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined'
        ? (module.exports = factory())
        : typeof define === 'function' && define.amd
        ? define(factory)
        : ((global = typeof globalThis !== 'undefined' ? globalThis : global || self),
          (global.animatedTimeSeries = factory()));
})(this, function () {
    'use strict';

    var settings = {
        id_var: 'USUBJID',
        visit_var: 'AVISIT',
        visit_order_var: 'AVISITN',
        day_var: 'ADY',
        measure_var: 'PARAM',
        result_var: 'AVAL',
        speed: 2500,
        aggregate: 'mean',
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
        getValue: getValue,
    };

    function addElement(name, parent) {
        var tagName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'div';
        var element = parent.append(tagName).classed('atm-'.concat(name), true);
        return element;
    }

    function layout() {
        var main = addElement('main', d3.select(this.element));
        this.settings.width = main.node().clientWidth / 2;
        this.settings.height = this.settings.width / 3;
        this.settings.margin = {
            top: 25,
            right: 10,
            bottom: 40,
            left: 60,
        };
        var timepoint = addElement('timepoint', main, 'h2');
        return {
            main: main,
            timepoint: timepoint,
        };
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

    function mutate() {
        var _this = this;

        var numericId = this.data.every(function (d) {
            return /^-?\d+\.?\d*$/.test(d.id) || /^-?\d*\.?\d+$/.test(d.id);
        });
        this.data.forEach(function (d) {
            // Rename data variables.
            Object.keys(_this.settings)
                .filter(function (setting) {
                    return /_var$/.test(setting);
                })
                .forEach(function (setting) {
                    d[setting.replace(/_var$/, '')] = [
                        'visit_order_var',
                        'day_var',
                        'result_var',
                    ].includes(setting)
                        ? +d[_this.settings[setting]]
                        : d[_this.settings[setting]];
                });
        });
    }

    function sets() {
        var sets = {
            id: new Set(
                this.data.map(function (d) {
                    return d.id;
                })
            ),
            visit: new Set(
                this.data.map(function (d) {
                    return d.visit;
                })
            ),
            visit_order: new Set(
                this.data.map(function (d) {
                    return d.visit_order;
                })
            ),
            day: new Set(
                this.data.map(function (d) {
                    return d.day;
                })
            ),
            measure: new Set(
                this.data.map(function (d) {
                    return d.measure;
                })
            ),
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
            }),
        };
        return groups;
    }

    function data() {
        var _this = this;

        mutate.call(this);
        this.data.sets = sets.call(this);
        this.data.visits = _toConsumableArray(
            new Set(
                this.data.map(function (d) {
                    return ''.concat(d.visit_order, '|').concat(d.visit);
                })
            ).values()
        )
            .map(function (value) {
                return value.split('|');
            })
            .sort(function (a, b) {
                return a[0] - b[0];
            })
            .map(function (value) {
                return value[1];
            });
        this.data.timepoints = this.data.visits.map(function (visit) {
            return d3.median(
                _this.data.filter(function (d) {
                    return d.visit === visit;
                }),
                function (d) {
                    return d.day;
                }
            );
        });
        this.data.groups = groups.call(this);
    }

    function getXScale(data) {
        return d3
            .scaleLinear()
            .domain(
                d3.extent(data, function (d) {
                    return d.day;
                })
            )
            .rangeRound([
                this.settings.margin.left,
                this.settings.width - this.settings.margin.right,
            ]);
    }

    function getYScale(data) {
        return d3
            .scaleLinear()
            .domain(
                d3.extent(data, function (d) {
                    return d.result;
                })
            )
            .nice()
            .rangeRound([
                this.settings.height - this.settings.margin.bottom,
                this.settings.margin.top,
            ]);
    }

    function getColorScale(scale) {
        var lo = scale.domain()[0];
        var hi = scale.domain()[1];
        return d3
            .scaleSequential()
            .domain([-Math.abs(hi - lo), Math.abs(hi - lo)])
            .interpolator(d3.interpolateViridis);
    }

    function layout$1(key) {
        var keyClass = key.toLowerCase().replace(/[^a-z0-9_]/g, '-'); // container

        var main = addElement('container', this.containers.main)
            .attr('width', this.settings.width)
            .attr('height', this.settings.height); // header

        var header = addElement('header', main, 'h3').text(key); // SVG

        var svg = addElement('svg', main, 'svg')
            .attr('width', this.settings.width)
            .attr('height', this.settings.height);
        var xAxis = addElement('x-axis', svg, 'g');
        var yAxis = addElement('y-axis', svg, 'g');
        var canvas = addElement('canvas', svg, 'g');
        var lines = addElement('lines', canvas, 'g');
        var points = addElement('points', canvas, 'g');
        var linesAggregate = addElement('lines-aggregate', canvas, 'g');
        var pointsAggregate = addElement('points-aggregate', canvas, 'g');
        return {
            main: main,
            svg: svg,
            xAxis: xAxis,
            yAxis: yAxis,
            canvas: canvas,
            points: points,
            lines: lines,
            pointsAggregate: pointsAggregate,
            linesAggregate: linesAggregate,
        };
    }

    function xAxis(measure) {
        var _this = this;

        return measure.containers.xAxis
            .attr(
                'transform',
                'translate(0,'.concat(this.settings.height - this.settings.margin.bottom, ')')
            )
            .call(d3.axisBottom(measure.xScale).ticks(this.settings.width / 80))
            .call(function (g) {
                return g
                    .append('text')
                    .attr('x', (_this.settings.width - _this.settings.margin.left) / 2)
                    .attr('y', _this.settings.margin.bottom / 2 + 4)
                    .attr('fill', 'currentColor')
                    .attr('text-anchor', 'center')
                    .attr('alignment-baseline', 'hanging')
                    .text('Study Day');
            });
    }

    function yAxis(measure) {
        var _this = this;

        return measure.containers.yAxis
            .attr('transform', 'translate('.concat(this.settings.margin.left, ',0)'))
            .call(d3.axisLeft(measure.yScale))
            .call(function (g) {
                return g.select('.domain').remove();
            })
            .call(function (g) {
                return g
                    .append('g')
                    .attr('stroke', 'currentColor')
                    .attr('stroke-opacity', 0.1)
                    .selectAll('line')
                    .data(measure.yScale.ticks())
                    .join('line')
                    .attr('y1', function (d) {
                        return 0.5 + measure.yScale(d);
                    })
                    .attr('y2', function (d) {
                        return 0.5 + measure.yScale(d);
                    })
                    .attr('x1', 0)
                    .attr(
                        'x2',
                        _this.settings.width -
                            _this.settings.margin.right -
                            _this.settings.margin.left
                    );
            });
    }

    function drawLines(measure) {
        var lines = measure.containers.lines
            .selectAll('line')
            .data(measure.ids, function (d) {
                return d[0];
            })
            .join('line')
            .attr('stroke-opacity', 0);
        return lines;
    }

    function points(measure) {
        var _this = this;

        var points = measure.containers.points
            .selectAll('circle')
            .data(measure.ids, function (d) {
                return d[0];
            })
            .join('circle')
            .attr('cx', function (d) {
                return measure.xScale(_this.util.getValue(d[1], 'visit', _this.visit, 'day'));
            })
            .attr('cy', function (d) {
                return measure.yScale(_this.util.getValue(d[1], 'visit', _this.visit, 'result'));
            })
            .attr('r', 1)
            .attr('fill', measure.colorScale(0))
            .attr('fill-opacity', 0.25)
            .attr('stroke', measure.colorScale(0))
            .attr('stroke-opacity', 0.5)
            .style('display', function (d) {
                return _this.util.getDatum(d[1], 'visit', _this.visit) ? null : 'none';
            });
        return points;
    }

    function linesAggregate(measure) {
        var _this = this;

        var lines = measure.containers.linesAggregate
            .selectAll('line.atm-line-aggregate')
            .data(d3.pairs(measure.aggregate))
            .join('line')
            .classed('atm-line-aggregate', true)
            .attr('x1', function (d, i) {
                return measure.xScale(_this.data.timepoints[i]);
            })
            .attr('x2', function (d, i) {
                return measure.xScale(_this.data.timepoints[i]);
            })
            .attr('y1', function (d) {
                return measure.yScale(d[0][1]);
            })
            .attr('y2', function (d) {
                return measure.yScale(d[0][1]);
            })
            .attr('stroke', function (d) {
                return measure.colorScale(d[1][1] - d[0][1]);
            })
            .attr('stroke-width', 3);
        return lines;
    }

    function pointsAggregate(measure) {
        var points = measure.containers.pointsAggregate
            .append('circle')
            .datum(measure.aggregate)
            .classed('atm-point-aggregate', true)
            .attr('cx', measure.xScale(this.timepoint))
            .attr('cy', function (d) {
                return measure.yScale(d[0][1]);
            })
            .attr('r', 4)
            .attr('fill', measure.colorScale(0))
            .attr('fill-opacity', 1)
            .attr('stroke', 'black')
            .attr('stroke-opacity', 1);
        return points;
    }

    function draw(measure) {
        measure.xAxis = xAxis.call(this, measure);
        measure.yAxis = yAxis.call(this, measure);
        measure.lines = drawLines.call(this, measure);
        measure.points = points.call(this, measure);
        measure.linesAggregate = linesAggregate.call(this, measure);
        measure.pointsAggregate = pointsAggregate.call(this, measure);
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
            if (d1 && d2)
                line.attr('x1', measure.xScale(d1.ADY))
                    .attr('y1', measure.yScale(d1.AVAL))
                    .attr('x2', measure.xScale(d1.ADY))
                    .attr('y2', measure.yScale(d1.AVAL))
                    .attr('stroke', measure.colorScale(d2.AVAL - d1.AVAL))
                    .attr('stroke-opacity', 0.25)
                    .transition()
                    .ease(d3.easeQuad)
                    .duration((2 * main.settings.speed) / 5)
                    .attr('x2', measure.xScale(d2.ADY))
                    .attr('y2', measure.yScale(d2.AVAL));
            else
                line.transition()
                    .duration((2 * main.settings.speed) / 5)
                    .attr('stroke-opacity', 0);
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

            if (main.visit === 0 && !d) point.style('display', 'none');
            else if (point.style('display') === 'none' && !!d)
                point.attr('cx', measure.xScale(d.day)).attr('cy', measure.yScale(d.result));
            var transition = point
                .transition()
                .ease(d3.easeQuad)
                .duration((2 * main.settings.speed) / 5)
                .delay((1 * main.settings.speed) / 5);
            if (d)
                transition
                    .attr('cx', measure.xScale(d.day))
                    .attr('cy', measure.yScale(d.result))
                    .attr('fill', baseline ? measure.colorScale(d.result - baseline.result) : 0)
                    .attr('fill-opacity', 0.25)
                    .attr('stroke', baseline ? measure.colorScale(d.result - baseline.result) : 0)
                    .style('display', null);
            else transition.attr('fill-opacity', 0.25).attr('stroke-opactiy', 0.5);
        });
    }

    function linesAggregate$1(measure) {
        var _this = this;

        measure.linesAggregate
            .filter(function (d, i) {
                return i === _this.visitIndex - 1;
            })
            .transition()
            .duration((2 * this.settings.speed) / 5)
            .delay((1 * this.settings.speed) / 5)
            .attr('x2', function (d, i) {
                return measure.xScale(_this.timepoint);
            })
            .attr('y2', function (d) {
                return measure.yScale(d[1][1]);
            });
    }

    function pointsAggregate$1(measure) {
        var _this = this;

        measure.pointsAggregate
            .transition()
            .ease(d3.easeQuad)
            .duration((2 * this.settings.speed) / 5)
            .delay((2 * this.settings.speed) / 5)
            .attr('cx', measure.xScale(this.timepoint))
            .attr('cy', function (d) {
                return measure.yScale(d[_this.visitIndex][1]);
            })
            .attr('fill', function (d, i) {
                return measure.colorScale(d[_this.visitIndex][1] - d[0][1]);
            })
            .on('end', function () {
                if (_this.visitIndex === 0)
                    measure.containers.canvas.selectAll('.atm-clone').remove();
            });
        measure.pointsAggregate.clone().classed('atm-clone', true);
    }

    function update() {
        var _this = this;

        this.visitIndex = this.visitIndex >= this.data.visits.length - 1 ? 0 : this.visitIndex + 1;
        this.visit = this.data.visits[this.visitIndex];
        this.timepoint = this.data.timepoints[this.visitIndex];
        this.containers.timepoint
            .transition()
            .delay(this.settings.speed / 2)
            .text(this.visit);
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
        console.log(this.timepoint);
        this.containers.timepoint.text(this.visit);
        this.xScale = getXScale.call(this, this.data);
        this.data.groups.measure.forEach(function (measure, key) {
            measure.xScale = _this.xScale;
            measure.yScale = getYScale.call(_this, measure);
            measure.colorScale = getColorScale.call(_this, measure.yScale);
            measure.containers = layout$1.call(_this, key);
            measure.ids = d3.group(measure, function (d) {
                return d.id;
            });
            measure.aggregate = _this.data.visits.reduce(function (aggregate, visit) {
                aggregate.push([
                    visit,
                    d3[_this.settings.aggregate](
                        measure.filter(function (d) {
                            return d.visit === visit;
                        }),
                        function (d) {
                            return d.result;
                        }
                    ),
                ]);
                return aggregate;
            }, []);
            draw.call(_this, measure);
        });
        d3.interval(function () {
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
            util: util,
        };
        main.containers = layout.call(main); // add elements to DOM

        data.call(main); // mutate and structure data

        init.call(main); // run the animation

        return main;
    }

    return animatedTimeSeries;
});
