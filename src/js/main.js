(function($, _) {
    "use strict";

    // draw the graph
    (function() {
        // cache dom reference
        var $chart = $("#chart");

        // define data source
        var metro_data = "/data/metro-data.csv";

        // percent formatter
        var pct = d3.format('.2%');

        // set up template
        _.templateSettings.variable = "t_data";
        var template = _.template($("#chart_template").html());

        // from csv, pass json to chart template
        d3.csv(metro_data, function(error, data) {
            var max = Math.ceil((_.max(data, "pct").pct * 100)) / 100;
            data = _.sortBy(data, "pct").reverse();
            data.barscale = pct(max).replace(".00", "");
            data.forEach(function(d) {
                d.barwidth = (d.pct / max) * 100;
                d.pct = pct(+d.pct);
            });
            $chart.html(template(data));

            // hook up the hover event
            $(".bar-wrapper").hover(
                function() {
                    $(this).find('.bar').css('background', '#395271');
                    $(this).find('.city_deets').css('font-weight', 'bold');
                }, function() {
                    $(this).find('.bar').css('background', '#b0c1d7');
                    $(this).find('.city_deets').css('font-weight', 'normal');
            });
        });

    })();

    // draw the U.S. map
    (function() {
        // cache dom references
        var $us_hover_output = $('#us_hover_output');
        var d3_map = d3.select('#us_map');

        // define data sources
        var data = {
          us_counties: "/data/us-counties.json",
          test: "/data/with_rates.csv"
        };

        // define map colors
        var map_colors = ['#238b45', '#74c476', '#bae4b3', '#edf8e9', '#fafafa', '#fee5d9', '#fcae91', '#fb6a4a', '#cb181d'].reverse();

        // define height, width, aspect ratio
        var aspect = 960 / 500;
        var width = d3_map.node().getBoundingClientRect().width;
        var height = width / aspect;

        // quantize color scale
        var color = d3.scale.quantize()
            .domain([-0.25, 0, 0.25])
            .range(map_colors);

        // set up the projection
        var projection = d3.geo.albersUsa()
            .scale(width)
            .translate([width / 2, height / 2]);

        // set up the path
        var path = d3.geo.path()
            .projection(projection);

        // append an svg to the DOM element
        var svg = d3_map.append("svg")
            .attr("width", width)
            .attr("height", height);

        // instantiate function to map topojson elements to rate data
        var rateById = d3.map();

        // the object to hold the data reference
        var fipsDict = {};

        // load the data (async) and populate the object
        d3_queue.queue()
            .defer(d3.json, data.us_counties)
            .defer(d3.csv, data.test, function(d) {
                var id = d.statefp + d.countyfp;
                // https://github.com/mbostock/d3/wiki/Arrays#map_set
                rateById.set(+id, +d.rate);
                fipsDict[+id] = d;
            })
        .await(ready);

        // when the data's loaded, draw the map
        function ready(error, us) {
            if (error) throw error;

            // define the gis data
            var counties = topojson.feature(us, us.objects.counties);
            var states = topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; });

            // draw the counties
            svg.append("g")
                .attr("class", "counties")
                .selectAll("path")
                .data(counties.features)
                .enter().append("path")
                .style("fill", function(d) {
                    // fill color, if it exists
                    if(typeof fipsDict[+d.id] !== "undefined") {
                        return color(fipsDict[+d.id].rate);
                    }
                })
                .attr("d", path)

                // bind the mouseover event
                .on('mouseover', function(d) {
                    if(typeof fipsDict[+d.id] !== "undefined") {
                        // highlight the county border
                        d3.select(this).style({
                            "stroke": "#aaa",
                            "stroke-width": 3
                        });
                        // retrieve the correct record
                        var rec = fipsDict[+d.id];
                        // format text color and prefix
                        var pre = "", col="#f55";
                        if (rec.rate > 0) {
                            pre = "+";
                            col = "lime";
                        }
                        // populate the div
                        $us_hover_output.html('<h4>' + rec.countyname + ", " + rec.statename + "</h4><span style='color: " + col + "'>" + pre + (rec.rate * 100).toFixed(2) + "%</span>");
                    }
                })
                .on('mouseout', function(d) {
                    // reset county border style
                    d3.select(this).style({
                        "stroke": "#eee",
                        "stroke-width": 1
                    });
                    // clear the div
                    $us_hover_output.html('');
                });

            // draw states
            svg.append("path")
                .attr("class", "states")
                .datum(states)
                .attr("d", path);

            // draw the legend
            // http://eyeseast.github.io/visible-data/2013/08/27/responsive-legends-with-d3/
            var d3_legend = d3.select('#us_legend')
                .append('ul')
                .attr('class', 'list-inline');

            var keys = d3_legend.selectAll('li.key')
                .data(color.range());

            keys.enter().append('li')
                .attr('class', 'key')
                .style('border-top-color', String)
                .text(function(d) {
                    var r = color.invertExtent(d);
                    var pct = d3.format('%');
                    return pct(r[0]);
                });

            // bind redraw function on resize
            d3.select(window).on("resize", _.debounce(redraw, 500));

            function redraw() {
                var width = d3_map.node().getBoundingClientRect().width;
                var height = width / aspect;

                svg.attr('width', width)
                    .attr('height', height);

                projection.scale(width)
                    .translate([width / 2, height / 2]);

                d3.select('.states')
                    .attr('d', path);

                d3.selectAll('.counties path')
                    .attr('d', path);
            }
        }
    })();






}(jQuery, _));
