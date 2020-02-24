<script>
	import { onMount } from "svelte";
	import Chart from "../Chart/Chart.svelte";

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

	$: chartData = {
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
	};
</script>

<Chart bind:data={chartData} />