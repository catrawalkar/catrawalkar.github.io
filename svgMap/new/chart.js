var canvas = document.getElementById("myChart");

var data = {
    labels: null,
    datasets: [{
        label: '# of Constituencies',
        data: null,
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
    }]
}

var myChart = new Chart(canvas, {
    type: 'bar',
    data: data,
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
                // gridLines: {
                //     color: "rgba(0, 0, 0, 0)",
                // }
            }]
            // xAxes: [{
            //     gridLines: {
            //         color: "rgba(0, 0, 0, 0)",
            //     }
            // }]
        },
        plugins: {
            // Change options for ALL labels of THIS CHART
            datalabels: {
                color: '#000',
                anchor: "end"
                // align: 'top'
            }
        },
        legend: {
            position: "bottom"
        },
    }
});



var canvas1 = document.getElementById("myChart1");

var myChart1 = new Chart(canvas1, {
    type: 'pie',
    data: data,
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
                // gridLines: {
                //     color: "rgba(0, 0, 0, 0)",
                // }
            }]
            // xAxes: [{
            //     gridLines: {
            //         color: "rgba(0, 0, 0, 0)",
            //     }
            // }]
        },
        plugins: {
            // Change options for ALL labels of THIS CHART
            datalabels: {
                color: '#000',
                anchor: "end"
                // align: 'top'
            }
        },
        legend: {
            position: "bottom"
        },
    }
});