<script>
  import { onMount } from 'svelte';
  import StockList from "./Components/StockList/StockList.svelte";
  import StockDetails from "./Components/StockDetails/StockDetails.svelte";

  let item;

  async function hashchange() {
		// the poor man's router!
		const path = window.location.hash.slice(1);

		if (path.startsWith('/stock')) {
      let stockId = path.slice(6);
      if (stockId) {
        stockId = stockId.replace('/', '');
        item = await fetch(`https://dr-trendify-api.herokuapp.com/data/${stockId}`).then(r => r.json());
  
        window.scrollTo(0,0);
      } else {
  			window.location.hash = '/';
      }
    //  else if (path.startsWith('/top')) {
		// 	page = +path.slice(5);
		// 	item = null;
		} else {
			window.location.hash = '/';
		}
	}

	onMount(hashchange);
</script>

<svelte:window on:hashchange={hashchange}/>

<main>
  <container>
    <header-section>
      <header-left>
        <p>dr trendify</p>
      </header-left>
      <header-right>
        <p>menu</p>
      </header-right>
    </header-section>

    <content-container>
      <content>
        {#if item}
          <StockDetails {item} />
        {:else}
          <StockList />
        {/if}
      </content>		
    </content-container>

  {#if item}
    <footer>
      <footer-item>
        <p class="header">P/E</p>
        <p class="text">{ item.pricePerEarning }</p>
      </footer-item>
      <footer-item>
        <p class="header">P/S</p>
        <p class="text">{ item.pricePerSales }</p>
      </footer-item>
      <footer-item>
        <p class="header">EPS</p>
        <p class="text">{ item.earningsPerShare }</p>
      </footer-item>
      <footer-item>
        <p class="header">D/A</p>
        <p class="text">{ item.dividendYield }</p>
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
		width: 80vw;

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

    background-color: black;

    display: flex;
    justify-content: center;
	}

  footer-item {
    padding: 10px;
    margin-left: 20px;
    margin-right: 20px;

    font-size: 32px;
    color: white;

    text-align: center;
  }

  p.header {

  }

  p.text {
    color: gray;
  }
</style>