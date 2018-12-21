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


var width = 600;
var height = 600;


d3.json("./india_2000-2014_state.json", function (map) {
    var projection = d3.geoMercator().scale(1).translate([0, 0]).precision(0);
    var path = d3.geoPath().projection(projection);
    var bounds = path.bounds(map);

    var scale = .95 / Math.max((bounds[1][0] - bounds[0][0]) / width,
        (bounds[1][1] - bounds[0][1]) / height);
    var transl = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2,
        (height - scale * (bounds[1][1] + bounds[0][1])) / 2
    ];
    projection.scale(scale).translate(transl);

    d3.select("svg")
    .attr("width", width).attr("height", height)
    .selectAll("path").data(map.features).enter().append("path")
        .attr("d", path)
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-width", "0.2px");

});