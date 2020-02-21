<script>
  import {
    ChevronLeftIcon
  } from "svelte-feather-icons";
  import Chart from "./Chart.svelte";
  import Loader from "../Loader/Loader.svelte";

  export let item;

  const body = {
    orderbookId: item.alfaId,
    chartType: "AREA",
    widthOfPlotContainer: 558,
    chartResolution: "DAY",
    navigator: false,
    percentage: false,
    volume: false,
    owners: false,
    timePeriod: "year",
    ta: [{
        type: "ema",
        timeFrame: 21
      },
      {
        type: "sma",
        timeFrame: 50
      },
      {
        type: "sma",
        timeFrame: 200
      }],
    compareIds: []
  };

  const getData = (async () => {
    let response = await fetch("https://limitless-solar-winds.herokuapp.com/https://www.avanza.se/ab/component/highstockchart/getchart/orderbook",
    {
      method: "POST",
      headers: [
        ["Content-Type", "application/json"],
        ["Cache-Control", "no-cache"],
        ["Access-Control-Allow-Origin", "*"]
      ],
      body: JSON.stringify(body)
    });
    return await response.json();
  })();
</script>

<div class="company-info">
  <div class="company-info-back-button-container">
    <a href="#/">
      <ChevronLeftIcon size="32" />
    </a>
  </div>
  <div class="company-name">
    <h1>{ item.name }</h1>
  </div>
</div>
{#await getData}
  <Loader />
{:then data}
  <div class="chart-container">
    <Chart {data} />
  </div>
{:catch error}
  <p>Ooops! {error}</p>
{/await}

<style>
a {
  color: #000;
}

h1 {
  padding: 50px;
  margin-left: auto;
  margin-right: auto;
}

.company-info-back-button-container {
  align-content: center;
  text-align: center;
  height: 100%;
  margin: auto;
}

.company-name {
  text-align: center;
  width: 100%;
}

.company-info {
  display: flex;
  width: 100%;
}

.chart-container {
  width: 40vw;
  height: 15vh;
}
</style>