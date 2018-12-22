// d3.json('./india_2014_parliament.json', function (error, data) {
//     if (error) throw error;

//     var path = d3.geoPath();

//     var width = 600;
//     var height = 600;

//     d3.select('svg')
//         .attr('width', width)
//         .attr('height', height)
//         .selectAll('path')
//         .data(data.features)
//         .enter()
//         .append('path')
//         .attr('d', path);
// });


// var width = 600;
// var height = 600;


// d3.json("./india_2000-2014_state.json", function (map) {
//     var projection = d3.geoMercator().scale(1).translate([0, 0]).precision(0);
//     var path = d3.geoPath().projection(projection);
//     var bounds = path.bounds(map);

//     var scale = .95 / Math.max((bounds[1][0] - bounds[0][0]) / width,
//         (bounds[1][1] - bounds[0][1]) / height);
//     var transl = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2,
//         (height - scale * (bounds[1][1] + bounds[0][1])) / 2
//     ];
//     projection.scale(scale).translate(transl);

//     d3.select("svg")
//         .attr("width", width).attr("height", height)
//         .selectAll("path").data(map.features).enter().append("path")
//         .attr("d", path)
//     .style("fill", "none");
// // .style("stroke", "black")
// // .style("stroke-width", "0.2px");

// });

var tooltip = d3.select('#svg')
    .append('div')
    .classed('tooltip', true);


d3.queue()
    .defer(d3.json, './india_2000-2014_state.json')
    .defer(d3.csv, './Book1.csv', function (row) {
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



        var width = 600;
        var height = 600;

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
            .on("mousemove", function (d) {
                tooltip
                    .style("opacity", 1)
                    .style("left", (d3.event.x - (tooltip.node().offsetWidth / 2)) + "px")
                    .style("top", (d3.event.y + 30) + "px")
                    .text(d.properties.state);
            })
            .on("mouseout", function () {
                tooltip
                    .style("opacity", 0);
            });

        var select = d3.select('select');

        select.on("change", d => setColor(d3.event.target.value));

        // setColor(select.property("value"));  

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