<script>
  import {
    ChevronLeftIcon,
    ActivityIcon
  } from "svelte-feather-icons";
  import Chart from "./StockDetailsChart.svelte";
  import Loader from "../Loader/Loader.svelte";

  import getChartData from "../../Shared/AlfaHelpers.js";

  export let item;
</script>

<div class="company-info">
  <div class="company-name">
    <header>
      <p class="header">{item.name}</p>
      <p class="subheader">
        <a href="https://www.avanza.se/aktier/om-aktien.html/{item.alfaId}" target="_blank">Avanza</a> | <a href="/#/backtest/{item.id}">Backtest</a></p>
    </header>
  </div>
</div>

{#await getChartData(item.alfaId, "year")}
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

header {
  text-align: center;
  padding: 50px;
}

.header {
  font-size: 36px;
  padding: 10px;
  margin: 0;
  text-transform: uppercase;
}

.subheader {
  padding: 0;
  margin: 0;
  color: gray;
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