<canvas id="chart"></canvas>

<script>
  import { onMount } from "svelte";
	export let data;
	let labels = [];
	let priceData = [];
	let emaData = [];
	let ma50Data = [];
	let ma200Data = [];

	$: for (let i = 0; i < data.dataPoints.length; i++) {
		try {
			let label = new Date(data.dataPoints[i][0]).toLocaleDateString();

			labels.push(label);
			priceData.push(data.dataPoints[i][1]);
			
			emaData.push(data.technicalAnalysis[0].dataPoints[i][1]);
			ma50Data.push(data.technicalAnalysis[1].dataPoints[i][1]);
			ma200Data.push(data.technicalAnalysis[2].dataPoints[i][1]);			
		} catch (error) {
			
		}
	}

  function createChart() {
    var ctx = document.getElementById("chart").getContext("2d");
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: "line",

        // The data for our dataset
        data: {
            labels: labels,
            datasets: [
							{
								label: "Price",
								borderColor: "#000",//"rgb(255, 99, 132)",
								backgroundColor: "#fff",
								borderWidth: 1.5,
								lineTension: 0,
                data: priceData,
                fill: false
							},
							{
								label: "EMA21",
                borderColor: "#CF0E5B",//"rgb(255, 99, 132)",
								backgroundColor: "#CF0E5B",
								borderWidth: 1,
								lineTension: 0,
                data: emaData,
                fill: false
							},
							{
								label: "MA50",
                borderColor: "#3AAE84",//"rgb(255, 99, 132)",
								backgroundColor: "#3AAE84",
								borderWidth: 1,
								lineTension: 0,
                data: ma50Data,
                fill: false
							},
							{
								label: "MA200",
                borderColor: "#E2A52E",//"rgb(255, 99, 132)",
								backgroundColor: "#E2A52E",
								borderWidth: 1,
								lineTension: 0,
                data: ma200Data,
                fill: false
							},
						]
        },

        // Configuration options go here
        options: {
					animation: false,
					scales: {
						yAxes: [{
							gridLines: {
                color: "rgba(0, 0, 0, 0)",
								drawBorder: false,
							}
						}],
						xAxes: [{
							bounds: 'ticks',
							gridLines: {
                color: "rgba(0, 0, 0, 0)",
								drawBorder: false,
							},
							ticks: {
								autoSkip: true,
								maxTicksLimit: 6,
								maxRotation: 0,
								minRotation: 0
							}
						}]
					},
					elements: {
							point:{
									radius: 0
							}
					}
        }
    });
  }

  onMount(createChart);
</script>