function getBody(orderbookId, timePeriod) {
  return {
    orderbookId: orderbookId,
    chartType: "AREA",
    widthOfPlotContainer: 558,
    chartResolution: "DAY",
    navigator: false,
    percentage: false,
    volume: false,
    owners: false,
    timePeriod: timePeriod,
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
  }
}

export default async function getChartData(orderbookId, timePeriod) {
  const body = getBody(orderbookId, timePeriod);

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
}