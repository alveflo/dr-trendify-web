<canvas id="chart"></canvas>

<script>
  import { onMount } from "svelte";
	export let data;

  function createChart() {
    var ctx = document.getElementById("chart").getContext("2d");
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: "line",

        // The data for our dataset
        data: data,

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