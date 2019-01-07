var tooltip = d3.select('#svg')
    .append('div')
    .classed('tooltip', true)
    .classed('ui', true)
    .classed('continer', true)
    .style("z-index", "10");

$(document).ready(function () {
    $('select').change(function () {
        var selectedOption123 = $(this).children("option:selected").val();
        selectedOption(selectedOption123);
    })

    selectedOption($('select').children("option:selected").val());
});

function selectedOption(val) {
    if (val == "constituencies") {
        stateData();
    }
    if (val == "jandhanYojna") {
        jandhanYojna();
    }
}

$('svg').on('load', (function () {
    $('#loader').hide();
}));

// d3.queue()
//     .defer(d3.json, './assets/json/India.json')
//     .defer(d3.csv, './assets/csv/India.csv', function (row) {
//         return {
//             state: row.Name_of_State,
//             constituencies: +row.No_of_Constituencies,
//             sc: +row.SC_Reservation,
//             st: +row.ST_Reservation
//         }
//     })
//     .await(function (error, mapData, constituencyData) {
//         if (error) throw error;


//         constituencyData.forEach(row => {

//             var states = mapData.features.filter(d => d.properties.ST_NM === row.state);
//             states.forEach(state => state.properties = row);
//         });

//         var width = 500;
//         var height = 500;

//         var projection = d3.geoMercator()
//             .scale(1)
//             .translate([0, 0])

//         var path = d3.geoPath().projection(projection);

//         var bounds = path.bounds(mapData);

//         var scale = .95 / Math.max((bounds[1][0] - bounds[0][0]) / width,
//             (bounds[1][1] - bounds[0][1]) / height);
//         var transl = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2,
//             (height - scale * (bounds[1][1] + bounds[0][1])) / 2
//         ];
//         projection.scale(scale).translate(transl);

//         d3.select('svg')
//             .attr("width", "100%")
//             .attr("height", "100%")
//             .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
//             .attr('preserveAspectRatio', 'xMinYMin')
//             .html(`<text x='370' y='30' class='nonselectable' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>\
//                 (Double click on the map to interact)</text>\
//                 <rect x="240" y="50" width="30" height="15" style="fill:rgb(222, 235, 247);stroke-width:1;stroke:#0e4369" />\
//                 <text x="275" y="63" class='nonselectable' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>\<</text>\
//                 <rect x="282" y="50" width="30" height="15" style="fill:rgb(49, 130, 189);stroke-width:1;stroke:#0e4369" />\
//                 <text x="405" y="62" class='nonselectable' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>Number Of Constituencies</text>`)
//             .selectAll(".state")
//             .data(mapData.features)
//             .enter()
//             .append("path")
//             .classed("state", true)
//             .attr("d", path)
//             .attr("fill", "none")
//             .on("mousemove", showTooltip)
//             .on("mouseover", function (d) {

//                 d3.select(this)
//                     .classed("mouseover", true)
//                     .raise();
//             })
//             .on("mouseleave", function (d) {
//                 d3.select(this)
//                     .classed("mouseover", false);
//             })
//             // .on("touchstart", showTooltip)
//             .on("mouseout", hideTooltip)
//             // .on("touchend", hideTooltip)
//             .on("dblclick", openStateMap);

//         var select = d3.selectAll('select');

//         select.on("change", d => {
//             // console.log(d3.event.target.value);
//             setColor(d3.event.target.value)
//         });

//         setColor(select.property("value"));

//         function setColor(val) {

//             var colorRanges = {
//                 constituencies: ["rgb(222, 235, 247)", "rgb(49, 130, 189)"],
//                 jandhanYojna: ["white", "red"]
//             }

//             var scale = d3.scaleLinear()
//                 .domain([0, d3.max(constituencyData, d => d[val])])
//                 .range(colorRanges[val]);

//             var selectStates = d3.selectAll(".state");

//             selectStates
//                 .transition()
//                 .duration(700)
//                 // .delay(2)
//                 .ease(d3.easeBackIn)
//                 .attr("fill", d => {
//                     var data = d.properties[val];
//                     return data ? scale(data) : "#f00";
//                 });
//         }
//     });