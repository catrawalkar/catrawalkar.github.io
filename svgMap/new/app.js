var tooltip = d3.select('#svg')
    .append('div')
    .classed('tooltip', true)
    .classed('ui', true)
    .classed('continer', true)
    .style("z-index", "10");

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


        constituencyData.forEach(row => {

            var states = mapData.features.filter(d => d.properties.ST_NM === row.state);
            states.forEach(state => state.properties = row);
        });

        var width = 500;
        var height = 500;

        var projection = d3.geoMercator()
            .scale(1).translate([0, 0]).precision(0);
        var path = d3.geoPath().projection(projection);

        var bounds = path.bounds(mapData);

        var scale = .95 / Math.max((bounds[1][0] - bounds[0][0]) / width,
            (bounds[1][1] - bounds[0][1]) / height);
        // var scale = 125;
        var transl = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2,
            (height - scale * (bounds[1][1] + bounds[0][1])) / 2
        ];
        // var transl = [width / 2, height / 1.4];
        projection.scale(scale).translate(transl);

        d3.select('svg')
            .attr("width", width)
            .attr("height", height)
            .html(`<text x='370' y='30' class='nonselectable' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>(Double click on the map to interact)</text>`)
            .selectAll(".state")
            .data(mapData.features)
            .enter()
            .append("path")
            .classed("state", true)
            .attr("d", path)
            .attr("fill", "none")
            .on("mousemove", showTooltip)
            .on("mouseover", function (d) {

                d3.select(this)
                    .classed("mouseover", true)
                    .raise();
            })
            .on("mouseleave", function (d) {
                d3.select(this)
                    .classed("mouseover", false);
            })
            // .on("touchstart", showTooltip)
            .on("mouseout", hideTooltip)
            // .on("touchend", hideTooltip)
            .on("dblclick", openStateMap);

        var select = d3.selectAll('select');

        select.on("change", d => setColor(d3.event.target.value));

        setColor(select.property("value"));

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
                // .delay(2)
                .ease(d3.easeBackIn)
                .attr("fill", d => {
                    var data = d.properties[val];
                    return data ? scale(data) : "#f00";
                });
        }
    });

$('svg').on('load', (function () {
    $('#loader').hide();
}));

function showTooltip(d) {

    tooltip
        .style("opacity", 1)
        .style("left", (d3.event.x - (tooltip.node().offsetWidth / 2)) + "px")
        .style("top", (d3.event.y + 30) + "px")
        .html(`
        <h3>${d.properties.state}</h3>
        <p>Constituencies: ${d.properties.constituencies}</p>
        <p>SC: ${d.properties.sc}</p>
        <p>ST: ${d.properties.st}</p>
        `);
    changeChart(d.properties.state);
}

function changeChart(d) {

    myChart.config.data.labels = partyData[d].labels;
    myChart.config.data.datasets[0].data = partyData[d].data;
    myChart.update()
}

function hideTooltip() {
    tooltip
        .style("opacity", 0);
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
        .style("top", "0px");
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

            d3.select('.stateMap')
                .append('svg')
                .classed('stateSvg', true)

            d3.select('.stateSvg')
                .attr("width", width)
                .attr("height", height)
                .html(`<text class='nonselectable' x='300' y='25' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>(Click outside to return)</text>`)
                .selectAll(".districts")
                .data(mapData.features)
                .enter()
                .append("path")
                .classed("districts", true)
                .attr("d", path)
                .attr("fill", "none")
                .on("mousemove", function (d) {
                    tooltip
                        .style("opacity", 1)
                        .style("left", (d3.event.x - (tooltip.node().offsetWidth / 2)) + "px")
                        .style("top", (d3.event.y + 30) + "px")
                        .html(`
                        <h3>${d.properties.constituency}</h3>
                        <p>Party: ${d.properties.winner_party}</p>
                        <p>${d.properties.winner}</p>
                        `);
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
                // .on("touchstart", showTooltip)
                .on("mouseout", function () {
                    tooltip
                        .style("opacity", 0);
                })
            // .on("touchend", hideTooltip);
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
                    .duration(2000)
                    // .delay(2)
                    .ease(d3.easeBackIn)
                    .attr("fill", d => {
                        // var data = d.properties[val];
                        // return data ? scale(data) : "#f00";
                        if (d.properties.winner_party == "Bharatiya Janata Party")
                            return "orange";
                        else if (d.properties.winner_party == "Indian National Congress")
                            return "green";
                        else if (d.properties.winner_party == "POK")
                            return "#929694";
                        else if (d.properties.winner_party == "Vacant")
                            return "#929694";
                        else if (d.properties.winner_party == "Telugu Desam Party")
                            return "yellow";
                        else if (d.properties.winner_party == "YSR Congress Party")
                            return "#41aef9";
                        else if (d.properties.winner_party == "All India United Democratic Front")
                            return "#094B02";
                        else if (d.properties.winner_party == "Independent")
                            return "#824715";
                        else if (d.properties.winner_party == "Rashtriya Lok Samta Party")
                            return "#824715";
                        else if (d.properties.winner_party == "Lok Janshakti Party")
                            return "#3C2AD5";
                        else if (d.properties.winner_party == "Rashtriya Janata Dal")
                            return "#A7C900";
                        else if (d.properties.winner_party == "Janata Dal (United)")
                            return "#8B1BD2";
                        else if (d.properties.winner_party == "Indian National Lok Dal")
                            return "#41aef9";
                        else if (d.properties.winner_party == "Jammu and Kashmir National Conference")
                            return "#41aef9";
                        else if (d.properties.winner_party == "Jharkhand Mukti Morcha")
                            return "#8B1BD2";
                        else if (d.properties.winner_party == "Janata Dal (Secular)")
                            return "#D05200";
                        else if (d.properties.winner_party == "Communist Party of India (Marxist)")
                            return "red";
                        else if (d.properties.winner_party == "Shiv Sena")
                            return "#0FC9C9";
                        else if (d.properties.winner_party == "Nationalist Congress Party")
                            return "#824715";
                        else if (d.properties.winner_party == "Biju Janata Dal")
                            return "#D05200";
                        else if (d.properties.winner_party == "Shiromani Akali Dal")
                            return "#41aef9";
                        else if (d.properties.winner_party == "Aam Aadmi Party")
                            return "#A1BEAA";
                        else if (d.properties.winner_party == "All India Anna Dravida Munnetra Kazhagam")
                            return "#A1BEAA";
                        else if (d.properties.winner_party == "Telangana Rashtra Samithi")
                            return "#A10079";
                        else if (d.properties.winner_party == "Samajwadi Party")
                            return "#094B02";
                        else if (d.properties.winner_party == "All India Trinamool Congress")
                            return "#00984F";
                        else {
                            return "blue";
                        }
                    });
            }
        });
}