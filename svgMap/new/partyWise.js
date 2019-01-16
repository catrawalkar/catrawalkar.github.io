function partyWise() {
  d3.queue()
    .defer(d3.json, "./assets/json/india_2014_parliament.json")
    .defer(d3.csv, "./assets/csv/Election 2014.csv", function (row) {
      return {
        constituency: row.Constituency,
        winner_party: row.WinnerParty,
        compare_party: row.CompareParty,
        BJP: row.BJP,
        INC: row.INC,
        BSP: row.BSP,
        SP: row.SP,
        BSPP: row.BSPP
      };
    })
    .await(function (error, mapData, constituencyData) {
      if (error) throw error;

      constituencyData.forEach(row => {
        var pcs = mapData.features.filter(
          d => d.properties.PC_NAME === row.constituency
        );
        pcs.forEach(pc => (pc.properties = row));
      });
      $("#firstChart").css("display", "none");
      $("#partyWiseRadio").css("display", "block");
      $("#chart1").css("display", "none");

      var width = 500;
      var height = 500;

      var projection = d3
        .geoMercator()
        .scale(1)
        .translate([0, 0]);

      var path = d3.geoPath().projection(projection);

      var bounds = path.bounds(mapData);

      var scale =
        0.95 /
        Math.max(
          (bounds[1][0] - bounds[0][0]) / width,
          (bounds[1][1] - bounds[0][1]) / height
        );
      var transl = [
        (width - scale * (bounds[1][0] + bounds[0][0])) / 2,
        (height - scale * (bounds[1][1] + bounds[0][1])) / 2
      ];
      projection.scale(scale).translate(transl);

      tool_tip.html(function (d) {
        return `
                    <h3>${d.properties.constituency}</h3>
                    <p>${d.properties.winner_party}</p>
                    ${ d.properties.BJP.length>0 ? '<p>BJP: '+d.properties.BJP+'%</p>' :''}
                    ${ d.properties.INC.length>0 ? '<p>INC: '+d.properties.INC+'%</p>' :''}
                    ${ d.properties.BSP.length>0 ? '<p>BSP: '+d.properties.BSP+'%</p>' :''}
                    ${ d.properties.SP.length>0 ? '<p>SP: '+d.properties.SP+'%</p>' :''}
                    ${ d.properties.BSPP.length>0 ? '<p>BSP + SP: '+d.properties.BSPP+'%</p>' :''}

                    `;
      });
      d3.select("svg").call(tool_tip);

      d3.select("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr(
          "viewBox",
          "0 0 " + Math.min(width, height) + " " + Math.min(width, height)
        )
        .attr("preserveAspectRatio", "xMinYMin")
        .html(
          `
        <rect x="240" y="30" width="20" id="1" height="15" style="fill:#eff3ff;stroke-width:1;stroke:#0e4369" />\
        <rect x="260" y="30" width="20" height="15" style="fill:#bdd7e7;stroke-width:1;stroke:#0e4369" />\
        <rect x="280" y="30" width="20" height="15" style="fill:#6baed6;stroke-width:1;stroke:#0e4369" />\
        <rect x="300" y="30" width="20" height="15" style="fill:#3182bd;stroke-width:1;stroke:#0e4369" />\
        <rect x="320" y="30" width="20" height="15" style="fill:#08519c;stroke-width:1;stroke:#0e4369" />\

        <text x="405" y="42" class='nonselectable' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>Vote Percentage</text>\
        
        <text x="240" y="55" class='nonselectable' font-style='italic' text-anchor='middle' font-size='0.6em' font-family='sans-serif' fill='black'>0</text>\
        <text x="260" y="55" class='nonselectable' font-style='italic' text-anchor='middle' font-size='0.6em' font-family='sans-serif' fill='black'>5</text>\
        <text x="280" y="55" class='nonselectable' font-style='italic' text-anchor='middle' font-size='0.6em' font-family='sans-serif' fill='black'>15</text>\
        <text x="300" y="55" class='nonselectable' font-style='italic' text-anchor='middle' font-size='0.6em' font-family='sans-serif' fill='black'>30</text>\
        <text x="320" y="55" class='nonselectable' font-style='italic' text-anchor='middle' font-size='0.6em' font-family='sans-serif' fill='black'>45</text>\
        <text x="340" y="55" class='nonselectable' font-style='italic' text-anchor='middle' font-size='0.6em' font-family='sans-serif' fill='black'>60</text>\
        `)
        .selectAll(".constituency")
        .data(mapData.features)
        .enter()
        .append("path")
        .classed("constituency", true)
        .attr("d", path)
        .attr("fill", "none")
        .on("mousemove", tool_tip.show)
        .on("mouseover", function (d) {
          d3.select(this)
            .classed("mouseover", true)
            .raise();
        })
        .on("mouseleave", function (d) {
          d3.select(this).classed("mouseover", false);
        })
        .on("touchstart", tool_tip.show)
        .on("mouseout", tool_tip.hide)
        .on("touchend", tool_tip.hide);
      // .on("dblclick", openStateMap);
      // console.log($("input[name='selectedParty']").val());

      var select = d3.selectAll('input[name="selectedParty"]');

      select.on("change", d => {
        // console.log(d3.event.target.value);
        setColor(d3.event.target.value);
      });

      setColor("PARTY");
      // setColor("PARTY");

      function setColor(val) {

        var selectStates = d3.selectAll(".constituency");

        if (val == "PARTY") {
          selectStates
            .transition()
            .duration(700)
            .ease(d3.easeBackIn)
            .attr("fill", d => {
              return partyColor[d.properties.winner_party];
            })
        } else if (val == "compareParty") {
          selectStates
            .transition()
            .duration(700)
            .ease(d3.easeBackIn)
            .attr("fill", d => {
              return partyColor[d.properties.compare_party];
            })

        } else {
          var colorRanges = {
            INC: ["#d2efef", "#6dc6c6"],
            // 1: ["#bdd7e7", "#41b6c4"],
            BJP: ["#ffe0c4", "#ffca9b"],
            BSPP: ["#deebf7", "#9ecae1"],
            BSP: ["#efedf5", "#bcbddc"],
            SP: ["#fee0d2", "#ef3b2c"]
          }

          var scale = d3.scaleLinear()
            .domain([0, d3.max(constituencyData, d => d[val])])
            .range(colorRanges[val]);

          selectStates
            .transition()
            .duration(600)
            // .delay(2)
            .ease(d3.easeBackIn)
            .attr("fill", d => {
              var data = d.properties[val];
              return data ? scale(data) : "#EDEDED";
            })
        }
      }
    });
}