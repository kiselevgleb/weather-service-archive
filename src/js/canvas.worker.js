// this worker calculates average data for the canvas
let data = [];

self.addEventListener('message', async function (e) {
  let coin = 0;
  let masSumValues = [];
  let masAverageValues = [];
  e.data.allRecords.forEach(dp => {
    masSumValues.push(dp);
    coin++;
    if (coin === e.data.coefficient) {
      let sum = 0;
      masSumValues.forEach(e => { sum += e; });
      masAverageValues.push(sum / masSumValues.length);
      coin = 0;
      masSumValues = [];
    }
  });
  self.postMessage(masAverageValues);
});