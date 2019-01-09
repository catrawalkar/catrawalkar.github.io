function jandhanYojna() {
    d3.queue()
        .defer(d3.json, './assets/json/India.json')
        .defer(d3.csv, './assets/csv/jandhanYojna.csv', function (row) {
            return {
                state: row.Name_of_State,
                beneficiary: +row.Beneficiaries,
                balance: +row.Balance_in_Beneficiary,
                cards: +row.No_of_RuPay,
                jandhanYojna: +row.Percentage
            }
        })
        .await(function (error, mapData, yojnaData) {
            if (error) throw error;
            $("#partyWiseRadio").css("display", "none");
            $("#firstChart").css("display", "block");
            $("#chart1").css("display", "block");


            yojnaData.forEach(row => {

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
            tool_tip.html(function (d) {
                return `
                <h3>${d.properties.state}</h3>
                <p>Total Beneficiaries: ${numRoundoff(d.properties.beneficiary)}</p>
                <p>Total Balance: ${d.properties.balance} Cr</p>
                <p>Total Rupay Cards issued: ${numRoundoff(d.properties.cards)}</p>
                <p>${d.properties.jandhanYojna} % of Population got Benefitted</p>

                `
            })
            /////
            d3.select('svg')
                .attr("width", "100%")
                .attr("height", "100%")
                .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
                .attr('preserveAspectRatio', 'xMinYMin')
                .html(`<text x='370' y='30' class='nonselectable' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>\
            (Double click on the map to interact)</text>\
            <rect x="240" y="50" width="30" height="15" style="fill: RGB(254,224,210);stroke-width:1;stroke:black" />\
            <text x="275" y="63" class='nonselectable' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>\<</text>\
            <rect x="282" y="50" width="30" height="15" style="fill: RGB(222,45,38);stroke-width:1;stroke: black"/>\
            <text x="395" y="62" class='nonselectable' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>Account Beneficiaries</text>\
            <text x="395" y="82" class='nonselectable' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>Under JanDhan Yojna</text>\
            <text x="395" y="102" class='nonselectable' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>Data as on 19 December 2018</text>`)

                .selectAll(".state")
                .data(mapData.features)
                .enter()
                .append("path")
                .classed("state", true)
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
            // .on("dblclick", openStateMap);

            setColor("jandhanYojna");
            changeChart();


            function setColor(val) {

                var colorRanges = {
                    jandhanYojna: ["RGB(254,224,210)", "RGB(222,45,38)"]
                }

                var scale = d3.scaleLinear()
                    .domain([0, d3.max(yojnaData, d => d[val])])
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

    function changeChart() {

        myChart.config.data.labels = janDhanYojana.topfive.labels;
        myChart.config.data.datasets[0].data = janDhanYojana.topfive.data;
        myChart.config.data.datasets[0].label = "# of Beneficiaries in crore"

        myChart1.config.data.labels = janDhanYojana.toptenpercentage.labels;
        myChart1.config.data.datasets[0].data = janDhanYojana.toptenpercentage.data;
        myChart1.config.data.datasets[0].label = "% of Population Benefitted"
        myChart1.config.type = "bar";


        myChart.update()
        myChart1.update()
    }

    function numRoundoff(val) {
        if (val >= 10000000) val = (val / 10000000).toFixed(2) + ' Cr';
        else if (val >= 100000) val = (val / 100000).toFixed(2) + ' Lac';
        else if (val >= 1000) val = (val / 1000).toFixed(2) + ' K';
        return val;
    }
}