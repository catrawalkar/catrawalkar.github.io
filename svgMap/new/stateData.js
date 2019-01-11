function stateData() {
    d3.queue()
        .defer(d3.json, './assets/json/India.json')
        .defer(d3.csv, './assets/csv/India.csv', function (row) {
            return {
                state: row.Name_of_State,
                constituencies: +row.No_of_Constituencies,
                sc: +row.SC_Reservation,
                st: +row.ST_Reservation
            }
        })
        .await(function (error, mapData, constituencyData) {
            if (error) throw error;

            $("#partyWiseRadio").css("display", "none");
            $("#firstChart").css("display", "block");
            $("#chart1").css("display", "none");
            constituencyData.forEach(row => {

                var states = mapData.features.filter(d => d.properties.ST_NM === row.state);
                states.forEach(state => state.properties = row);
            });

            var width = 500;
            var height = 500;

            var projection = d3.geoMercator()
                .scale(1)
                .translate([0, 0])

            var path = d3.geoPath().projection(projection);

            var bounds = path.bounds(mapData);

            var scale = .95 / Math.max((bounds[1][0] - bounds[0][0]) / width,
                (bounds[1][1] - bounds[0][1]) / height);
            var transl = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2,
                (height - scale * (bounds[1][1] + bounds[0][1])) / 2
            ];
            projection.scale(scale).translate(transl);
            /////
            tool_tip
                .html(function (d) {
                    return `<h3>${d.properties.state}</h3>
                            <p>Constituencies: ${d.properties.constituencies}</p>
                            <p>SC: ${d.properties.sc}</p>
                            <p>ST: ${d.properties.st}</p>
                            `
                });
            /////

            d3.select('svg')
                .attr("width", "100%")
                .attr("height", "100%")
                .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
                .attr('preserveAspectRatio', 'xMinYMin')
                .html(`<text x='370' y='30' class='nonselectable' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>\
            (Double click on the map to interact)</text>\
            <rect x="240" y="50" width="30" height="15" style="fill:rgb(222, 235, 247);stroke-width:1;stroke:#0e4369" />\
            <text x="275" y="63" class='nonselectable' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>\<</text>\
            <rect x="282" y="50" width="30" height="15" style="fill:rgb(49, 130, 189);stroke-width:1;stroke:#0e4369" />\
            <text x="405" y="62" class='nonselectable' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>Number Of Constituencies</text>`)
                .selectAll(".state")
                .data(mapData.features)
                .enter()
                .append("path")
                .classed("state", true)
                .attr("d", path)
                .attr("fill", "none")
                .on("mousemove", function (d) {
                    tool_tip.show(d);
                    changeChart(d.properties.state);
                })
                .on("mouseover", function (d) {

                    d3.select(this)
                        .classed("mouseover", true)
                        .raise();
                })
                .on("mouseleave", function (d) {
                    d3.select(this)
                        .classed("mouseover", false);
                })
                .on("touchstart", function (d) {
                    tool_tip.show(d);
                    changeChart(d.properties.state);
                })
                .on("mouseout", tool_tip.hide)
                .on("touchend", tool_tip.hide)
                .on("dblclick", openStateMap);

            // var select = d3.selectAll('select');

            // select.on("change", d => {
            //     // console.log(d3.event.target.value);
            //     setColor(d3.event.target.value)
            // });

            // setColor(select.property("value"));
            setColor("constituencies");


            function setColor(val) {

                var colorRanges = {
                    constituencies: ["rgb(222, 235, 247)", "rgb(49, 130, 189)"],
                    jandhanYojna: ["white", "red"]
                }

                var scale = d3.scaleLinear()
                    .domain([0, d3.max(constituencyData, d => d[val])])
                    .range(colorRanges[val]);

                var selectStates = d3.selectAll(".state");

                selectStates
                    .transition()
                    .duration(700)
                    .ease(d3.easeBackIn)
                    .attr("fill", d => {
                        var data = d.properties[val];
                        return data ? scale(data) : "#f00";
                    });
            }
        });

    function changeChart(d) {

        myChart.config.data.labels = partyData[d].labels;
        myChart.config.data.datasets[0].data = partyData[d].data;
        myChart.config.data.datasets[0].label = "# of Constituencies"


        myChart1.config.data.labels = partyData[d].labels;
        myChart1.config.data.datasets[0].data = partyData[d].data;
        myChart1.config.type = "pie";
        myChart1.config.data.datasets[0].label = "# of Constituencies"

        myChart.update()
        myChart1.update()
    }

    function openStateMap(d) {
        d3.select("#svg")
            .append("div")
            .classed("stateMap", true)
            .classed("ui", true)
            .classed("raised", true)
            .classed("segment", true)
            .style("margin", "50px")
            .style("position", "absolute")
            .style("top", "0px")
            .style("height", "75%")
            .style("width", "75%");
        d3.queue()
            .defer(d3.json, './assets/json/' + d.properties.state + '.json')
            .defer(d3.csv, './assets/csv/Election 2014.csv', function (row) {
                return {
                    constituency: row.Constituency,
                    winner: row.Winner,
                    winner_party: row.WinnerParty
                }
            })
            .await(function (error, mapData, constituencyData) {
                if (error) {
                    console.log(error)
                }

                d3.select('.stateMap')
                    .append('a')
                    .classed('stateMapRibbon', true)
                    .classed('ui', true)
                    .classed('blue', true)
                    .classed('right', true)
                    .classed('ribbon', true)
                    .classed('label', true)
                    .classed('nonselectable', true);

                d3.select(".stateMapRibbon")
                    .html(`
                    <i class="map outline icon"></i>${d.properties.state} Map
                    `)

                constituencyData.forEach(row => {
                    var pcs = mapData.features.filter(d => d.properties.PC_NAME === row.constituency);
                    pcs.forEach(pc => pc.properties = row);
                });

                var width = 400;
                var height = 400;

                var projection = d3.geoMercator()
                    .scale(1).translate([0, 0]).precision(0);
                var path = d3.geoPath().projection(projection);

                var bounds = path.bounds(mapData);

                var scale = .95 / Math.max((bounds[1][0] - bounds[0][0]) / width,
                    (bounds[1][1] - bounds[0][1]) / height);
                var transl = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2,
                    (height - scale * (bounds[1][1] + bounds[0][1])) / 2
                ];
                projection.scale(scale).translate(transl);
                /////
                tool_tip
                    .html(function (d) {
                        return `
                        <h3>${d.properties.constituency}</h3>
                        <p>Party: ${d.properties.winner_party}</p>
                        <p>${d.properties.winner}</p>
                        `
                    });
                /////

                /////
                // You can use these functions to get the unique values of a property in an array of objects

                // Get the unique parties
                function uniqueBy(arr, mapper) {
                    return unique(pluck(arr, mapper));
                }

                function unique(arr) {
                    return arr.filter(function (value, index, self) {
                        return self.indexOf(value) === index;
                    });
                }

                function pluck(arr, mapper) {
                    return arr.map(function (d) {
                        return typeof (mapper) === "string" ? d.properties[mapper] : mapper(d);
                    });
                }

                var uniqueParties = uniqueBy(mapData.features, "winner_party"); // ["BJP", "INC", "BSP"]
                console.log(uniqueParties)


                /////

                d3.select('.stateMap')
                    .append('svg')
                    .classed('stateSvg', true)
                var svg = d3.select('.stateSvg')
                    .attr("width", "100%")
                    .attr("height", "100%")
                    .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
                    .attr('preserveAspectRatio', 'xMinYMin')
                    .html(`<text class='nonselectable' x='300' y='25' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>(Click outside to return)</text>`)
                /////
                debugger
                var x = 43;
                var x1 = 10;
                var y = 13;
                var y1 = 0;
                var legend = svg
                    .selectAll(".legend-item")
                    .data(uniqueParties)
                    .enter()
                    .append("g")
                    .attr("class", "legend-item");
                legend.append("rect")
                    .attr("x", function () {
                        // x += 10;
                        return x1;
                    })
                    .attr("y", function () {
                        y1 += 18;
                        return y1;
                    })
                    .attr("width", "30")
                    .attr("height", "15")
                    .attr("fill", function (d) {
                        return partyColor[d]
                    })
                // .attr("style","fill:rgb(222, 235, 247);stroke-width:1;stroke:#0e4369")
                legend.append("text")
                    .attr("class", "nonselectable")
                    .attr("x", function () {
                        // x += 10;
                        return x;
                    })
                    .attr("y", function () {
                        y += 18;
                        return y;
                    })
                    // .attr("text-anchor", 'middle')
                    .attr("font-size", '1em')
                    .attr("font-family", 'sans-serif')
                    .attr("fill", 'black')
                    .html(function (d) {
                        return d
                    })

                /////

                // d3.select('.stateSvg')
                //     .attr("width", "100%")
                //     .attr("height", "100%")
                //         <rect x="0" y="0" width="30" height="15" style="fill:#ff7900;stroke-width:1;stroke:#0e4369" />\
                // <text x="110" y="13" class='nonselectable' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>Bharatiya Janata Party</text>\
                // <rect x="0" y="20" width="30" height="15" style="fill:#00cccc;stroke-width:1;stroke:#0e4369" />\
                // <text x="120" y="33" class='nonselectable' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>Indian National Congress</text>`)

                svg.selectAll(".districts")
                    .data(mapData.features)
                    .enter()
                    .append("path")
                    .classed("districts", true)
                    .attr("d", path)
                    .attr("fill", "none")
                    .on("mousemove", tool_tip.show)
                    .on("mouseover", function (d) {
                        d3.select(this)
                            .classed("mouseover", true)
                            .raise();
                    })
                    .on("mouseleave", function (d) {
                        d3.select(this)
                            .classed("mouseover", false);
                    })
                    .on("touchstart", tool_tip.show)
                    .on("mouseout", tool_tip.hide)
                    .on("touchend", tool_tip.hide);

                //      CODE FOR REMOVING THE ELEMENT
                var stateMap = d3.select(".stateMap");
                var stateMapWithContent = d3.selectAll(".stateMap, .stateMap *");

                function equalToEventTarget() {
                    return this == d3.event.target;
                }

                d3.select('body')
                    .on('click', function () {
                        var outside = stateMapWithContent.filter(equalToEventTarget).empty();
                        if (outside) {
                            stateMap.remove();
                            tool_tip
                                .html(function (d) {
                                    return `<h3>${d.properties.state}</h3>
                            <p>Constituencies: ${d.properties.constituencies}</p>
                            <p>SC: ${d.properties.sc}</p>
                            <p>ST: ${d.properties.st}</p>
                            `
                                });
                        }
                    })

                // var select = d3.select('select');

                // select.on("change", d => setColor(d3.event.target.value));

                setColor("PARTY");

                function setColor(val) {

                    // var colorRanges = {
                    //     constituencies: ["#ffb3ff", "#1a001a"]
                    // }

                    // var scale = d3.scaleLinear()
                    //     .domain([0, d3.max(constituencyData, d => d[val])])
                    //     .range(colorRanges[val]);

                    var selectStates = d3.selectAll(".districts");

                    selectStates
                        .transition()
                        .duration(700)
                        .ease(d3.easeBackIn)
                        .attr("fill", d => {
                            return partyColor[d.properties.winner_party];
                        })
                }
            });
    }
}