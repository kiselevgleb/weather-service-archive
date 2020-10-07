// this worker get data form server about temperature 1881 - 2006 and write data to DB table 'temperature'
import { openDB } from 'idb';

let data = [];
let db;

async function init() {
  db = await openDB('weatherDb', 1);
}

init();

self.addEventListener('message', async function (e) {
  let response = await fetch('https://back-weather-service.herokuapp.com/temperature');
  if (response.ok) {
    data = await response.json();
  } else {
    alert("Ошибка HTTP: " + response.status);
  }
  const tx = db.transaction('temperature', 'readwrite');
  await Promise.all([
    data.forEach(async element => {
      tx.store.add(element.v, [element.t])
    }),
    tx.done,
  ]);
  if (data.length > 0) {
    self.postMessage(data);
  }
});