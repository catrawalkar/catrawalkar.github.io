function partyWise() {
  d3.queue()
    .defer(d3.json, "./assets/json/india_2014_parliament.json")
    .defer(d3.csv, "./assets/csv/partyWise.csv", function (row) {
      return {
        constituency: row.Constituency,
        BJP: row.BJP,
        INC: row.INC
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
      $("#chart1").css("display", "block");

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
                    <p>BJP: ${d.properties.BJP}</p>
                    <p>INC: ${d.properties.INC}</p>
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
          `<text x='370' y='30' class='nonselectable' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>\
        (Double click on the map to interact)</text>\
        <rect x="240" y="50" width="30" height="15" style="fill:rgb(222, 235, 247);stroke-width:1;stroke:#0e4369" />\
        <text x="275" y="63" class='nonselectable' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>\<</text>\
        <rect x="282" y="50" width="30" height="15" style="fill:rgb(49, 130, 189);stroke-width:1;stroke:#0e4369" />\
        <text x="405" y="62" class='nonselectable' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>Number Of Constituencies</text>`
        )
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

      setColor(select.property("value"));
      // setColor("PARTY");

      function setColor(val) {
        console.log(val);
        var colorRanges = {
          INC: ["#e5f5e0", "#a1d99b"],
          BJP: ["#deebf7", "#9ecae1"],
          
        }

        var scale = d3.scaleLinear()
          .domain([0, d3.max(constituencyData, d => d[val])])
          .range(colorRanges[val]);

        var selectStates = d3.selectAll(".constituency");

        selectStates
          .transition()
          .duration(700)
          // .delay(2)
          .ease(d3.easeBackIn)
          // .attr("fill", d => {
          //   return partyColor[d.properties.winner_party];
          // });
          .attr("fill", d => {
            var data = d.properties[val];
            // console.log(data)
            // if(data>0 && data<15){
            //   return "rgb(254, 237, 222)"
            // }
            // if(data>15 && data<35){
            //   return "rgb(253, 190, 133)"
            // }
            // if(data>35 && data<45){
            //   return "rgb(253, 141, 60)"
            // }
            // if(data>45 && data<60){
            //   return "rgb(230, 85, 13)"
            // }
            // if(data>60){
            //   return "rgb(166, 54, 3)"
            // }
            // if(data==undefined || data==""){
            //   return "#EDEDED"
            // }


            
            return data ? scale(data) : "#EDEDED";
          })
      }
    });

  function showTooltip(d) {
    tooltip
      .style("opacity", 1)
      .style("left", d3.event.x - tooltip.node().offsetWidth / 2 + "px")
      .style("top", d3.event.y + 30 + "px").html(`
            <h3>${d.properties.constituency}</h3>
            <p>Constituencies: ${d.properties.winner_party}</p>
            <p>SC: ${d.properties.winner}</p>
            <p>ST: ${d.properties.st}</p>
            `);
    // changeChart(d.properties.state);
  }

  function changeChart(d) {
    myChart.config.data.labels = partyData[d].labels;
    myChart.config.data.datasets[0].data = partyData[d].data;
    myChart.config.data.datasets[0].label = "# of Constituencies";

    myChart1.config.data.labels = partyData[d].labels;
    myChart1.config.data.datasets[0].data = partyData[d].data;
    myChart1.config.type = "pie";
    myChart1.config.data.datasets[0].label = "# of Constituencies";

    myChart.update();
    myChart1.update();
  }

  function hideTooltip() {
    tooltip.style("opacity", 0);
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
      .defer(d3.json, "./assets/json/" + d.properties.state + ".json")
      .defer(d3.csv, "./assets/csv/Election 2014.csv", function (row) {
        return {
          constituency: row.Constituency,
          winner: row.Winner,
          winner_party: row.WinnerParty
        };
      })
      .await(function (error, mapData, constituencyData) {
        if (error) {
          console.log(error);
        }

        d3.select(".stateMap")
          .append("a")
          .classed("stateMapRibbon", true)
          .classed("ui", true)
          .classed("blue", true)
          .classed("right", true)
          .classed("ribbon", true)
          .classed("label", true)
          .classed("nonselectable", true);

        d3.select(".stateMapRibbon").html(`
                <i class="map outline icon"></i>${d.properties.state} Map
                `);

        constituencyData.forEach(row => {
          var pcs = mapData.features.filter(
            d => d.properties.PC_NAME === row.constituency
          );
          pcs.forEach(pc => (pc.properties = row));
        });

        var width = 400;
        var height = 400;

        var projection = d3
          .geoMercator()
          .scale(1)
          .translate([0, 0])
          .precision(0);
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

        d3.select(".stateMap")
          .append("svg")
          .classed("stateSvg", true);

        d3.select(".stateSvg")
          .attr("width", "100%")
          .attr("height", "100%")
          .attr(
            "viewBox",
            "0 0 " + Math.min(width, height) + " " + Math.min(width, height)
          )
          .attr("preserveAspectRatio", "xMinYMin")
          .html(
            `<text class='nonselectable' x='300' y='25' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>(Click outside to return)</text>`
          )
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
              .style("left", d3.event.x - tooltip.node().offsetWidth / 2 + "px")
              .style("top", d3.event.y + 30 + "px").html(`
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
            d3.select(this).classed("mouseover", false);
          })
          // .on("touchstart", showTooltip)
          .on("mouseout", function () {
            tooltip.style("opacity", 0);
          });
        // .on("touchend", hideTooltip);
        //      CODE FOR REMOVING THE ELEMENT
        var stateMap = d3.select(".stateMap");
        var stateMapWithContent = d3.selectAll(".stateMap, .stateMap *");

        function equalToEventTarget() {
          return this == d3.event.target;
        }

        d3.select("body").on("click", function () {
          var outside = stateMapWithContent.filter(equalToEventTarget).empty();
          if (outside) {
            stateMap.remove();
          }
        });

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
            // .delay(2)
            .ease(d3.easeBackIn)
            .attr("fill", d => {
              console.log(partyColor[d.properties.winner_party]);
              return partyColor[d.properties.winner_party];
            });
        }
      });
  }
}