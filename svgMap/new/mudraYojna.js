function mudraYojna() {
    d3.queue()
        .defer(d3.json, './assets/json/India.json')
        .defer(d3.csv, './assets/csv/mudraYojna.csv', function (row) {
            return {
                state: row.Name_of_State,
                shishuAc: +row.Shishu_No_Of_Account,
                shishuAmt: +row.Shishu_Disbursement_Amt,
                kishoreAc: +row.Kishore_No_Of_Account,
                kishoreAmt: +row.Kishore_Disbursement_Amt,
                tarunAc: +row.Tarun_No_Of_Account,
                tarunAmt: +row.Tarun_Disbursement_Amt,
                totalAc: +row.Total_No_Of_Account,
                mudraYojna: +row.Total_Disbursement_Amt
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
                <p>Accounts Under Shishu Yojana: ${d.properties.shishuAc}</p>
                <p>Total Amount Under Shishu Yojana: ${d.properties.shishuAmt} crore</p>
                <p>Accounts Under Kishore Yojana: ${d.properties.kishoreAc}</p>
                <p>Total Amount Under Kishore Yojana: ${d.properties.kishoreAmt} crore</p>
                <p>Accounts Under Tarun Yojana: ${d.properties.tarunAc}</p>
                <p>Total Amount Under Tarun Yojana: ${d.properties.tarunAmt} crore</p>
                `
            })
            /////
            d3.select('svg')
                .attr("width", "100%")
                .attr("height", "100%")
                .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
                .attr('preserveAspectRatio', 'xMinYMin')
                .html(`
            <rect x="240" y="30" width="30" height="15" style="fill: #efedf5;stroke-width:1;stroke:black" />\
            <text x="275" y="43" class='nonselectable' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>\<</text>\
            <rect x="282" y="30" width="30" height="15" style="fill: #756bb1;stroke-width:1;stroke: black"/>\
            <text x="395" y="42" class='nonselectable' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>Account Beneficiaries</text>\
            <text x="395" y="62" class='nonselectable' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>Under JanDhan Yojna</text>\
            <text x="395" y="82" class='nonselectable' font-style='italic' text-anchor='middle' font-size='1em' font-family='sans-serif' fill='black'>Data as on 19 December 2018</text>`)
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

            setColor("mudraYojna");
            changeChart();


            function setColor(val) {

                var colorRanges = {
                    mudraYojna: ["#efedf5", "#756bb1"]
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