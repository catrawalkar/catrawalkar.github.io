var tooltip = d3.select('#svg')
    .append('div')
    .classed('tooltip', true)
    .classed('ui', true)
    .classed('continer', true)
    .style("z-index", "10");

d3.queue()
    .defer(d3.json, './india.json')
    .defer(d3.csv, './india.csv', function (row) {
        return {
            state: row.Name_of_State,
            constituencies: +row.No_of_Constituencies
        }
    })
    .await(function (error, mapData, constituencyData) {
        if (error) throw error;


        constituencyData.forEach(row => {
            var states = mapData.features.filter(d => d.properties.st_nm === row.state);
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
                    .classed("mouseover", true);
            })
            .on("mouseleave", function (d) {
                d3.select(this)
                    .classed("mouseover", false);
            })
            // .on("touchstart", showTooltip)
            .on("mouseout", hideTooltip)
            // .on("touchend", hideTooltip)
            .on("dblclick", openStateMap);

        var select = d3.select('select');

        select.on("change", d => setColor(d3.event.target.value));

        setColor(select.property("value"));

        function setColor(val) {

            var colorRanges = {
                constituencies: ["#ffb3ff", "#1a001a"]
            }

            var scale = d3.scaleLinear()
                .domain([0, d3.max(constituencyData, d => d[val])])
                .range(colorRanges[val]);

            var selectStates = d3.selectAll(".state");

            selectStates
                .transition()
                .duration(2000)
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
        <p>${d.properties.state}</p>
        <p>${d.properties.constituencies}</p>
        `);
    // .text(d.properties.state);
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
        .defer(d3.json, './stateData/' + d.properties.state + '.json')
        .defer(d3.csv, './india.csv', function (row) {
            return {
                state: row.Name_of_State,
                constituencies: +row.No_of_Constituencies
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
                .classed('label', true);

            d3.select(".stateMapRibbon")
                .html(`
            <i class="map outline icon"></i>${d.properties.state} Map
            `)

            // constituencyData.forEach(row => {
            //     var states = mapData.features.filter(d => d.properties.st_nm === row.state);
            //     states.forEach(state => state.properties = row);
            // });



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
                        <p>${d.properties.PC_NAME}</p>
                        <p>${d.properties.PARTY}</p>
                        `);
                    // .text(d.properties.state);
                })
                .on("mouseover", function (d) {
                    d3.select(this)
                        .classed("mouseover", true);
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
                        console.log(d);
                        return d.properties.PARTY.includes("INC") ? "green" : "orange"
                    });
            }
        });

}