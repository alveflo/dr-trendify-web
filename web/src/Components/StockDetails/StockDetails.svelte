<script>
  import Chart from './Chart.svelte';
  export let item;

  const body = {
    orderbookId: item.alfaId,
    chartType: 'AREA',
    widthOfPlotContainer: 558,
    chartResolution: 'DAY',
    navigator: false,
    percentage: false,
    volume: false,
    owners: false,
    timePeriod: 'year',
    ta: [{
        type: 'ema',
        timeFrame: 21
      },
      {
        type: 'sma',
        timeFrame: 50
      },
      {
        type: 'sma',
        timeFrame: 200
      }],
    compareIds: []
  };

  const getData = (async () => {
    let response = await fetch('https://limitless-solar-winds.herokuapp.com/https://www.avanza.se/ab/component/highstockchart/getchart/orderbook',
    {
      method: 'POST',
      headers: [
        ['Content-Type', 'application/json'],
        ['Cache-Control', 'no-cache'],
        ['Access-Control-Allow-Origin', '*']
      ],
      body: JSON.stringify(body)
    });
    return await response.json();
  })();
</script>

<h1>{ item.name }</h1>
{#await getData}
<p>Loading...</p>
{:then data}
<Chart {data} />
{:catch error}
<p>Ooops! {error}</p>
{/await}