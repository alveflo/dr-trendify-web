<script>
  import { BarChart2Icon, MenuIcon } from "svelte-feather-icons";
  import { onMount } from 'svelte';
  import StockList from "./Components/StockList/StockList.svelte";
  import StockDetails from "./Components/StockDetails/StockDetails.svelte";
  import Backtest from "./Components/Backtest/Backtest.svelte";

  let item;
  let showDetails = true;

  async function hashchange() {
		// the poor man's router!
		const path = window.location.hash.slice(1);

		if (path.startsWith('/stock')) {
      showDetails = true;
      let stockId = path.slice(6);
      if (stockId) {
        stockId = stockId.replace('/', '');
        item = await fetch(`https://dr-trendify-api.herokuapp.com/data/${stockId}`).then(r => r.json());
  
        window.scrollTo(0,0);
      } else {
        window.location.hash = '/';
        item = null;
      }
		} else if (path.startsWith('/backtest')) {
      showDetails = false;
      let stockId = path.slice(9);
      if (stockId) {
        stockId = stockId.replace('/', '');
        item = await fetch(`https://dr-trendify-api.herokuapp.com/data/${stockId}`).then(r => r.json());
  
        window.scrollTo(0,0);
      } else {
        window.location.hash = '/';
        item = null;
      }
		} else {
			window.location.hash = '/';
      item = null;
		}
	}

	onMount(hashchange);
</script>

<svelte:window on:hashchange={hashchange}/>

<main>
  <container>
    <header-section>
      <header-left>
        <BarChart2Icon size="32" />
      </header-left>
      <header-right>
        <MenuIcon size="32" />
      </header-right>
    </header-section>

    <content-container>
      <content>
        {#if item}
          {#if showDetails}
            <StockDetails {item} />
          {:else}
            <Backtest {item} />
          {/if}
        {:else}
          <StockList />
        {/if}
      </content>		
    </content-container>

  {#if item}
    <footer>
      <footer-item>
        <p class="header">P/E</p>
        <p class="text">{ item.pricePerEarning.toFixed(1) }</p>
      </footer-item>
      <footer-item>
        <p class="header">P/S</p>
        <p class="text">{ item.pricePerSales.toFixed(1) }</p>
      </footer-item>
      <footer-item>
        <p class="header">EPS</p>
        <p class="text">{ item.earningsPerShare.toFixed(1) }</p>
      </footer-item>
      <footer-item>
        <p class="header">D/A</p>
        <p class="text">{ item.dividendYield.toFixed(1) }%</p>
      </footer-item>
    </footer>
  {/if}
  </container>
</main>

<style>
	container {
		width: 100vw;
		min-height: 100vh;

		display: flex;
		flex-direction: column;
		align-content: center;
	}

	header-section {
    margin-top: 15px;
		width: 70vw;

		display: flex;
		justify-content: space-between;

		margin-left: auto;
		margin-right: auto;
	}

	header-left {
		padding: 2.5vh;
	}

	header-right {
		padding: 2.5vh;
	}

	content-container {
		flex: 1;
	}

	content {
		width: 60vw;

		margin-left: auto;
		margin-right: auto;


		display: flex;
		flex-direction: column;

		align-items: center;
	}

	footer {
		padding-top: 1vh;
		padding-bottom: 1vh;

    background-color: #212528;

    display: flex;
    justify-content: center;
	}

  footer-item {
    padding: 10px;
    margin-left: 20px;
    margin-right: 20px;

    text-align: center;
  }

  p.header {
    color: gray;
    font-size: 18px;
    margin-bottom: 5px;
  }

  p.text {
    margin-top: 5px;
    font-size: 32px;
    color: white;
  }
</style>