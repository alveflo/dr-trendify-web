<script>
import {
  ActivityIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronsUpIcon,
  TrendingUpIcon
} from "svelte-feather-icons";
import Loader from "../Loader/Loader.svelte";

export let market;
let marketName = '';

$: switch (Number(market)) {
  case 1:
    marketName = "OMX Stockholm";
    break;
  case 2:
    marketName = "OMX Copenhagen";
    break;
  case 3:
    marketName = "OMX Helsinki";
    break;
  case 4:
    marketName = "First North Stockholm";
    break;
  case 5:
    marketName = "First North Copenhagen";
    break;
  case 6:
    marketName = "Aktietorget (Sweden)";
    break;
  default:
    marketName = "";
}

$: getStockList = (async () => {
    let url = "https://dr-trendify-api.herokuapp.com/data/trending/" + (market > 0 ? market : '');
    let response = await fetch(url);

    return await response.json();
})();
</script>

<header>
  <p class="header">Trending</p>
  {#if marketName !== ''}
    <p class="subheader">Trending stocks @ {marketName}</p>
  {:else}
    <p class="subheader">Trending stocks based on moving averages</p>
  {/if}
</header>

{#await getStockList}
  <Loader />
{:then stockDetails}

{#if stockDetails.length === 0}
<p>No trending stocks :(</p>
{:else}
<table class="stock-details-table">
  <thead>
    <th></th>
    <th>1 M</th>
    <th>3 M</th>
    <th>6 M</th>
    <th>1 Y</th>
    <th>Trend</th>
    <th></th>
  </thead>
  <tbody>
    {#each stockDetails as stockDetail}
    <tr>
      <td class="detail-name">{stockDetail.name}</td>
      <td class="detail">{stockDetail.yieldOneMonth.toFixed(1)} %</td>
      <td class="detail">{stockDetail.yieldThreeMonths.toFixed(1)} %</td>
      <td class="detail">{stockDetail.yieldSixMonths.toFixed(1)} %</td>
      <td class="detail">{stockDetail.yieldOneYear.toFixed(1)} %</td>
      {#if stockDetail.isBabyrageTrending}
        <td class="is-trending">
            <ChevronsUpIcon size="24" />
        </td>
      {:else}
        <td class="detail">
            <ChevronUpIcon size="24" />
        </td>
      {/if}
      <td class="actions">
        <a href="#/stock/{stockDetail.id}">
          <ChevronRightIcon size="24"/>        
        </a>
      </td>
    </tr>
    {/each}
  </tbody>
</table>
{/if}
{:catch error}
  <p>Oops! {error}</p>
{/await}

<style>
header {
  text-align: center;
  padding: 100px;
}

a {
  color: #000;
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
  text-transform: lowercase;
  color: gray;
}

.stock-details-table th, td {
  text-align: left;
  padding: 10px;
}

.detail-name, .actions {
  width: 20vw;
}

.detail-name {
  text-align: right;
}

.detail {
  color: gray;
  width: 4vw;
}

.is-trending {
  width: 4vw;
}
</style>