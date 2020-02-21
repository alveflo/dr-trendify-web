<canvas id="chart"></canvas>

<script>
  import { onMount } from "svelte";
	export let data;
	let labels = [];
	let uninvested = [];
	let invested = [];

	function isPositiveTrending(ema21, sma50, sma200) {
		if (ema21 <= 0) return false;
		if (sma50 <= 0) return false;
		if (sma200 <= 0) return false;
		return true;
	}

	function isMaTrending(ema21, sma50, sma200) {
		if (ema21 <= sma50) return false;
		if (sma50 <= sma200) return false;
		return true;
	}

	$: for (let i = 0; i < data.dataPoints.length; i++) {
		try {
			let label = new Date(data.dataPoints[i][0]).toLocaleDateString();

			labels.push(label);
			let price = data.dataPoints[i][1];
			
			let ema21 = data.technicalAnalysis[0].dataPoints[i][1];
			let sma50 = data.technicalAnalysis[1].dataPoints[i][1];
			let sma200 = data.technicalAnalysis[2].dataPoints[i][1];

			let isTrending = isPositiveTrending(ema21, sma50, sma200) && isMaTrending(ema21, sma50, sma200);

			invested.push(isTrending ? price : null);
			uninvested.push(isTrending ? null : price);
		} catch (error) {
			
		}
	}

  function createChart() {
    let ctx = document.getElementById("chart").getContext("2d");
    let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: "line",

        // The data for our dataset
        data: {
            labels: labels,
            datasets: [
							{
								borderColor: "gray",
								backgroundColor: "#fff",
								borderWidth: 1.5,
								borderDash: [5,5],
                data: uninvested,
                fill: false
							},
							{
                borderColor: "#000",
								backgroundColor: "#fff",
								borderWidth: 1.5,
                data: invested,
                fill: false
							}
						]
        },

        // Configuration options go here
        options: {
					legend: {
						display: false
					},
					tooltips: {
						enabled: false
					},
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