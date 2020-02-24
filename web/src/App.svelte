<script>
  import { slide } from 'svelte/transition';
  import { BarChart2Icon, MenuIcon } from "svelte-feather-icons";
  import { onMount } from 'svelte';
  import StockList from "./Components/StockList/StockList.svelte";
  import StockDetails from "./Components/StockDetails/StockDetails.svelte";
  import Backtest from "./Components/Backtest/Backtest.svelte";
  import Menu from "./Components/Menu/Menu.svelte";

  import { Path } from "path-parser"; 

  let item;
  let showDetails = true;
  let market = 0;
  let showMenu = false;

  async function hashchange() {
    window.scrollTo(0,0);
    market = 0;
    item = null;

    const path = window.location.hash.slice(1);
    showMenu = false;

    let routes = {
      "/:marketId": (routeData) => StockList,
      "/stock/:stockId": (routeData) => {},
      "/backtest/:stockId": (routeData) => {},
    };

    const marketPath = new Path("/:marketId").test(path);
    const detailsPath = new Path("/stock/:stockId").test(path);
    const backtestPath = new Path("/backtest/:stockId").test(path);

    if (backtestPath) {
      item = await fetch(`https://dr-trendify-api.herokuapp.com/data/${backtestPath.stockId}`).then(r => r.json());
    } else if (detailsPath) {
      item = await fetch(`https://dr-trendify-api.herokuapp.com/data/${detailsPath.stockId}`).then(r => r.json());
    } else if (marketPath && !isNaN(marketPath.marketId)) {
      market = marketPath.marketId;
    } else {
      window.location.hash = '/';
    }
	}

  function toggleMenu(e) {
    e.preventDefault();
    showMenu = !showMenu;
  }

	onMount(hashchange);
</script>

<svelte:window on:hashchange={hashchange}/>

<main>
  <container>
    <header-section>
      <header-left>
        <a href="#/">
          <BarChart2Icon size="32" />
        </a>
      </header-left>
      <header-right>
        <a href="#/" on:click={toggleMenu} role="button">
          <MenuIcon size="32" />
        </a>
      </header-right>
    </header-section>

  {#if showMenu}
  <div class="menu-container">
    <div class="menu" transition:slide>
      <Menu />
    </div>
  </div>
  {/if}

    <content-container class:overlay={showMenu}>
      <content>
        {#if item}
          {#if showDetails}
            <StockDetails {item} />
          {:else}
            <Backtest {item} />
          {/if}
        {:else}
          <StockList bind:market={market} />
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
  a {
    color: #000;
  }
  .menu-container {
    position: relative;

    width: 70vw;
    margin-left: auto;
    margin-right: auto;
  }

  .menu {
    position: absolute;
    background-color: #fff;
    z-index: 10;

    width: 68vw;
    margin-left: auto;
    margin-right: auto;
  }

	container {
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

  .overlay {
    width: 100%;
    height: 100%;            
    opacity: 0.4;
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