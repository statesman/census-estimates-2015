(function($, _) {
    "use strict";

    // settings
    var viz_config = {
      us_counties: "data/us-counties.json",
      tx_counties: "data/texas-counties.json",
      us_county_data: "data/us_county_pop_2015.csv",
      tx_county_data: "data/tx_county_pop_2015.csv",
      state_county_data: "data/state_county_pop_2015.csv",
      us_msa_data: "data/us_msa_pop_2015.csv",
      tx_msa_data: "data/tx_msa_pop_2015.csv",
      map_colors: ['#238b45', '#74c476', '#bae4b3', '#edf8e9', '#fafafa', '#fee5d9', '#fcae91', '#fb6a4a', '#cb181d'].reverse(),
      min_year: 2010,
      max_year: 2015,
      year_map: {
          2010: "pop10",
          2011: "pop11",
          2012: "pop12",
          2013: "pop13",
          2014: "pop14",
          2015: "pop15"
      },
      color_domain: {
          1: 0.1,
          2: 0.1,
          3: 0.15,
          4: 0.15,
          5: 0.2
      },
      pct_format: d3.format('.2%'),
      comma_format: d3.format('0,000')
      };

    // helper function to return % change
    function pct_change(new_num, old_num) {
        return (+new_num - +old_num) / +old_num;
    }

    // helper function to return color scale range
    function get_color_scale_range(minyear, maxyear) {
        var diff = +maxyear - +minyear;
        return viz_config.color_domain[diff];
    }

    // global template settings
    _.templateSettings.variable = "t_data";
    var chart_template = _.template($("#chart_template").html());
    var map_template = _.template($("#map_table_template").html());

    // draw the graph
    (function() {
        // cache dom references
        var $chart = $("#chart");
        var $msa_slider = $("#msa_slider");

        // from csv, pass json to chart template
        d3.csv(viz_config.us_msa_data, function(error, data) {

            function makeChart(startyear, endyear) {
                // filter for MSAs w/ > 1m people in 2015
                data = _.filter(data, function(d) { return d.pop15 > 1000000;  });

                // new array to hold objects with pct change
                var data_with_pct = [];

                // loop and add pct change attribute
                _.each(data, function(d) {
                    d[startyear] = +d[startyear];
                    d[endyear] = +d[endyear];
                    d.pct_change = (d[endyear] - d[startyear]) / d[startyear];
                    data_with_pct.push(d);
                });

                // sort by pct change, take top 10
                data_with_pct = _.sortBy(data_with_pct, "pct_change").reverse().slice(0, 10);

                // get the next integer up from the hightest pct change value, for scale
                var max = Math.ceil((_.max(data_with_pct, "pct_change").pct_change * 100)) / 100;
                data_with_pct.barscale = viz_config.pct_format(max).replace(".00", "");

                // another loop to add bar width and format % change
                // probably a better to do this - global template function?
                _.each(data_with_pct, function(d) {
                    d.barwidth = (d.pct_change / max) * 100;
                    d.pct_change = viz_config.pct_format(+d.pct_change).replace(".00","");
                });

                // pass to template
                $chart.html(chart_template(data_with_pct));
            }

            // initial view = year over year
            makeChart('pop14', 'pop15');

            // instantiate slider
            $msa_slider.slider({
              range: true,
              min: viz_config.min_year,
              max: viz_config.max_year,
              step: 1,
              values: [viz_config.max_year - 1, viz_config.max_year],
              slide: function( event, ui ) {
                if ( ui.values[0] !== ui.values[1] ) {
                    makeChart(viz_config.year_map[ui.values[0]], viz_config.year_map[ui.values[1]]);
                    $("#year_hed" ).html("Growth from " + ui.values[0] + "-" + ui.values[1]);
                }
              }
          });

          // add labels
            var opt = $msa_slider.data()['ui-slider'].options;
            var vals = opt.max - opt.min;
            for (var i = 0; i <= vals; i++) {
                var el = $('<label class="notouchy">' + (i + opt.min) + '</label>').css('left', (i/vals*100) + '%');
                $msa_slider.append(el);
            }


        });

    })();

    // draw the U.S. map
    (function() {
        // cache dom references
        var $us_hover_output = $('#us_hover_output');
        var d3_map = d3.select('#us_map');
        var $us_slider = $("#us_slider");

        // define height, width, aspect ratio
        var aspect = 960 / 500;
        var width = d3_map.node().getBoundingClientRect().width;
        var height = width / aspect;

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

        var min_domain = 0, max_domain = 0;

        var col_domain = get_color_scale_range(2014, 2015);

        // quantize color scale
        var color = d3.scale.quantize()
            .domain([-col_domain, 0, col_domain])
            .range(viz_config.map_colors);

        // load the data (async) and populate the object
        d3_queue.queue()
            .defer(d3.json, viz_config.us_counties)
            .defer(d3.csv, viz_config.us_county_data, function(d) {
                if (d.countyfips !== "000") {
                    var id = d.statefips + d.countyfips;
                    var rate = pct_change(d.pop15, d.pop14);
                    // https://github.com/mbostock/d3/wiki/Arrays#map_set
                    rateById.set(+id, rate);
                    fipsDict[+id] = d;
                }
            })
        .await(ready);

        // when the data's loaded, draw the map
        function ready(error, us) {
            if (error) throw error;

            console.log(min_domain, max_domain);

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
                        var rec = fipsDict[+d.id];
                        var pct_ch = pct_change(rec.pop15, rec.pop14);
                        return color(pct_ch);
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

                        // get pct change
                        var pct_ch = pct_change(rec.pop15, rec.pop14);

                        // format prefix
                        var pre = "";
                        if (pct_ch > 0) {
                            pre = "+";
                        }

                        var data_to_template = {
                            county: rec.county + ", " + rec.state,
                            oldyear: {
                                year: 2014,
                                val: viz_config.comma_format(rec.pop14)
                            },
                            newyear: {
                                year: 2015,
                                val: viz_config.comma_format(rec.pop15)
                            },
                            pct_change: pre + viz_config.pct_format(pct_ch)
                        };

                        $us_hover_output.html(map_template(data_to_template));
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


            // instantiate the slider
            $us_slider.slider({
              range: true,
              min: viz_config.min_year,
              max: viz_config.max_year,
              step: 1,
              values: [viz_config.max_year - 1, viz_config.max_year],
              slide: function( event, ui ) {
                if ( ui.values[0] !== ui.values[1] ) {
                    redrawUsMap(ui.values[0], ui.values[1]);
                    $("#us_legend_note" ).html("Population change, " + ui.values[0] + "-" + ui.values[1]);
                }
              }
            });

            // draw the labels
            var opt = $us_slider.data()['ui-slider'].options;
            var vals = opt.max - opt.min;
            for (var i = 0; i <= vals; i++) {
                var el = $('<label class="notouchy whitetext">' + (i + opt.min) + '</label>').css('left', (i/vals*100) + '%');
                $us_slider.append(el);
            }

            // function to change map data on slider change
            function redrawUsMap(minyear, maxyear) {
                var min_year_var = viz_config.year_map[minyear];
                var max_year_var = viz_config.year_map[maxyear];

                var col_domain = get_color_scale_range(minyear, maxyear);

                // quantize color scale
                var color = d3.scale.quantize()
                    .domain([-col_domain, 0, col_domain])
                    .range(viz_config.map_colors);

                $("#us_legend").html("");

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

                d3.selectAll('.counties path')
                    .style("fill", function(d) {
                        // fill color, if it exists
                        if(typeof fipsDict[+d.id] !== "undefined") {
                            var rec = fipsDict[+d.id];
                            var pct_ch = pct_change(rec[max_year_var], rec[min_year_var]);
                            return color(pct_ch);
                        }
                    })
                    .attr('d', path)
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

                            // get pct change
                            var pct_ch = pct_change(rec[max_year_var], rec[min_year_var]);

                            // format text color and prefix
                            var pre = "";
                            if (pct_ch > 0) {
                                pre = "+";
                            }

                            var data_to_template = {
                                county: rec.county + ", " + rec.state,
                                oldyear: {
                                    year: minyear,
                                    val: viz_config.comma_format(rec[min_year_var])
                                },
                                newyear: {
                                    year: maxyear,
                                    val: viz_config.comma_format(rec[max_year_var])
                                },
                                pct_change: pre + viz_config.pct_format(pct_ch)
                            };

                            $us_hover_output.html(map_template(data_to_template));

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
            }

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

    // draw the Texas map
    (function() {
        // cache dom references
        var d3_map = d3.select('#tx_map');
        var $tx_slider = $("#tx_slider");

        // define height, width, aspect ratio
        var aspect = 960 / 900;
        var width = d3_map.node().getBoundingClientRect().width;
        var height = width / aspect;

        var col_domain = get_color_scale_range(2014, 2015);

        // quantize color scale
        var color = d3.scale.quantize()
            .domain([-col_domain, 0, col_domain])
            .range(viz_config.map_colors);

        // set up the projection
        var projection = d3.geo.conicConformal()
            .center([2, 31.15])
            .rotate([102, 0])
            .scale(5.5 * width)
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

        var txdata;

        // load the data (async) and populate the object
        d3_queue.queue()
            .defer(d3.json, viz_config.tx_counties)
            .defer(d3.csv, viz_config.tx_county_data, function(d) {
                if (d.countyfips !== "000") {
                    var county = d.county;
                    var rate = pct_change(d.pop15, d.pop14);
                    // https://github.com/mbostock/d3/wiki/Arrays#map_set
                    rateById.set(county, rate);
                    fipsDict[county] = d;
                } else {
                    txdata = d;
                }
            })
        .await(ready);

        // when the data's loaded, draw the map
        function ready(error, counties) {
            if (error) throw error;

            // define the gis data
            var countyGeo = topojson.feature(counties, counties.objects.tl_2014_us_county_texas).features;

            $("#tx_table_header_row").html(
                "<th></th>" +
                "<th>2014</th>" +
                "<th>2015</th>" +
                "<th>Change</th>"
            );

            $("#tx_table_row").html(
                "<td>Texas</td>" +
                "<td>" + viz_config.comma_format(txdata.pop14) + "</td>" +
                "<td>" + viz_config.comma_format(txdata.pop15) + "</td>" +
                "<td>" + "+" + viz_config.pct_format(pct_change(txdata.pop15, txdata.pop14)) + "</td>"
            );

            $("#tx_county_table_row").html(
                "<td colspan=4 class='muted'>Hover or tap on a county</td>"
            );

            // draw the counties
            svg.append('g')
                .attr('class', 'texas-counties')
                .selectAll('.texas-counties')
                .data(countyGeo)
                .enter().append('path')
                .style("fill", function(d) {
                    // fill color, if it exists
                    if(typeof fipsDict[d.id] !== "undefined") {
                        var rec = fipsDict[d.id];
                        var pct_ch = pct_change(rec.pop15, rec.pop14);
                        return color(pct_ch);
                    }
                })
                .attr('d', path)
                // bind the mouseover event
                .on('mouseover', function(d) {
                    if(typeof fipsDict[d.id] !== "undefined") {
                        // highlight the county border
                        d3.select(this).style({
                            "stroke": "#aaa",
                            "stroke-width": 4
                        });
                        // retrieve the correct record
                        var rec = fipsDict[d.id];

                        // get pct change
                        var pct_ch = pct_change(rec.pop15, rec.pop14);

                        // format text color and prefix
                        var pre = "";
                        if (pct_ch > 0) {
                            pre = "+";
                        }

                        $("#tx_county_table_row").html(
                            "<td>" + rec.county + "</td>" +
                            "<td>" + viz_config.comma_format(rec.pop14) + "</td>" +
                            "<td>" + viz_config.comma_format(rec.pop15) + "</td>" +
                            "<td>" + pre + viz_config.pct_format(pct_change(rec.pop15, rec.pop14)) + "</td>"
                        );
                    }
                })
                .on('mouseout', function(d) {
                    // reset county border style
                    d3.select(this).style({
                        "stroke": "#aaa",
                        "stroke-width": 1
                    });
                    // clear the div
                    $("#tx_county_table_row").html(
                        "<td colspan=4 class='muted'>Hover or tap on a county</td>"
                    );
                });

            // draw the state outline
            svg.append('path')
                .datum(topojson.mesh(counties, counties.objects.tl_2014_us_county_texas, function(a, b) {
                    return a === b;
                }))
                .attr('d', path)
                .attr('class', 'texas-border');

            // draw the legend
            // http://eyeseast.github.io/visible-data/2013/08/27/responsive-legends-with-d3/
            var d3_legend = d3.select('#tx_legend')
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

            // draw the slider
            $tx_slider.slider({
              range: true,
              min: viz_config.min_year,
              max: viz_config.max_year,
              step: 1,
              values: [viz_config.max_year - 1, viz_config.max_year],
              slide: function( event, ui ) {
                if ( ui.values[0] !== ui.values[1] ) {
                    redrawTxMap(ui.values[0], ui.values[1]);
                    $("#tx_legend_note" ).html("Population change, " + ui.values[0] + "-" + ui.values[1]);
                }
              }
            });

            var opt = $tx_slider.data()['ui-slider'].options;
            var vals = opt.max - opt.min;
            for (var i = 0; i <= vals; i++) {
                var el = $('<label class="notouchy">' + (i + opt.min) + '</label>').css('left', (i/vals*100) + '%');
                $tx_slider.append(el);
            }

            function redrawTxMap(minyear, maxyear) {
                var min_year_var = viz_config.year_map[minyear];
                var max_year_var = viz_config.year_map[maxyear];

                var col_domain = get_color_scale_range(minyear, maxyear);

            $("#tx_table_header_row").html(
                "<th></th>" +
                "<th>" + minyear + "</th>" +
                "<th>" + maxyear + "</th>" +
                "<th>Change</th>"
            );


            $("#tx_table_row").html(
                "<td>Texas</td>" +
                "<td>" + viz_config.comma_format(txdata[min_year_var]) + "</td>" +
                "<td>" + viz_config.comma_format(txdata[max_year_var]) + "</td>" +
                "<td>" + "+" + viz_config.pct_format(pct_change(txdata[max_year_var], txdata[min_year_var])) + "</td>"
            );

            $("#tx_county_table_row").html(
                "<td colspan=4 class='muted'>Hover or tap on a county</td>"
            );


                // quantize color scale
                var color = d3.scale.quantize()
                    .domain([-col_domain, 0, col_domain])
                    .range(viz_config.map_colors);

                $("#tx_legend").html("");

                var d3_legend = d3.select('#tx_legend')
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

                d3.selectAll('.texas-counties path')
                    .style("fill", function(d) {
                        // fill color, if it exists
                        if(typeof fipsDict[d.id] !== "undefined") {
                            var rec = fipsDict[d.id];
                            var pct_ch = pct_change(rec[max_year_var], rec[min_year_var]);
                            return color(pct_ch);
                        }
                    })
                    .attr('d', path)
                    // bind the mouseover event
                    .on('mouseover', function(d) {
                        if(typeof fipsDict[d.id] !== "undefined") {
                            // highlight the county border
                            d3.select(this).style({
                                "stroke": "#aaa",
                                "stroke-width": 4
                            });
                            // retrieve the correct record
                            var rec = fipsDict[d.id];

                            // get pct change
                            var pct_ch = pct_change(rec[max_year_var], rec[min_year_var]);

                            $("#tx_county_table_row").html(
                                "<td>" + rec.county + "</td>" +
                                "<td>" + viz_config.comma_format(rec[min_year_var]) + "</td>" +
                                "<td>" + viz_config.comma_format(rec[max_year_var]) + "</td>" +
                                "<td>" + viz_config.pct_format(pct_ch) + "</td>"
                            );
                        }
                    })
                    .on('mouseout', function(d) {
                        // reset county border style
                        d3.select(this).style({
                            "stroke": "#aaa",
                            "stroke-width": 1
                        });
            $("#tx_county_table_row").html(
                "<td colspan=4 class='muted'>Hover or tap on a county</td>"
            );
                    });
            }

            // bind redraw function on resize
            $(window).resize(_.debounce(redraw, 500));

            function redraw() {
                var width = d3_map.node().getBoundingClientRect().width;
                var height = width / aspect;

                svg.attr('width', width)
                  .attr('height', height);

                projection
                  .scale(5.5 * width)
                  .translate([width / 2, height / 2]);

                d3.selectAll('.texas-counties path')
                    .attr('d', path);

                d3.select('path.county-borders')
                    .attr('d', path);

                d3.select('path.texas-border')
                    .attr('d', path);
            }
        }
    })();

}(jQuery, _));
